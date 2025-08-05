"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import ButtonLink from "@/shared/Button/ButtonLink";
import DropzoneComponent from "@/components/form-component/DropZone";
import React, { useState, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ColDef, ICellRendererParams, ModuleRegistry, NewValueParams, themeBalham } from "ag-grid-community";
import { parse, ParseResult } from 'papaparse';
import { useStore } from "@/store/store-context";
import ValidateProductsAgGrid from "@/components/ag-grid/uploaded-items-ag-grid";
import { PencilIcon, TrashBinIcon } from "@/icons";

ModuleRegistry.registerModules([AllCommunityModule]);

const withAddOns = themeBalham.withParams({
  headerBackgroundColor: "black",
  wrapperBorderRadius: "5px",
  rowBorder: { style: "solid", width: 1, color: "#E0E0E0" },
  columnBorder: { style: "solid", width: 1, color: "#E0E0E0" },
  rowHeight: 30,
  rowHoverColor: "#f5faff",
  oddRowBackgroundColor: "#ffffff",
  rowNumbersSelectedColor: "#f9f9f9",
});

type UploadData = {
    sku: string;
    quantity: number;
};

const reorganizeProcessedData = (processedData: UploadData[], allSKUs: string[]): UploadData[] => {
  // Track seen SKUs to identify which SKUs are duplicates (but keep all entries)
  const seenSKUs = new Set<string>();
  const duplicateSKUs = new Set<string>();

  // First pass: Identify which SKUs are duplicates
  processedData.forEach((row) => {
    if (seenSKUs.has(row.sku)) {
      duplicateSKUs.add(row.sku); // Mark as duplicate
    } else {
      seenSKUs.add(row.sku);
    }
  });

  // Categorize the rows
  const SKUsNotFound: UploadData[] = [];
  const SKUsDuplicate: UploadData[] = [];
  const SKUsFoundUnique: UploadData[] = [];

  processedData.forEach((row) => {
    if (!allSKUs.includes(row.sku)) {
      SKUsNotFound.push(row); // SKU not in productStore
    } else if (duplicateSKUs.has(row.sku)) {
      SKUsDuplicate.push(row); // All duplicates go here
    } else {
      SKUsFoundUnique.push(row); // Unique and found SKUs
    }
  });

  // Combine in order: Not Found → All Duplicates → Unique Found
  return [...SKUsNotFound, ...SKUsDuplicate, ...SKUsFoundUnique];
};

const bulkOrder = () => {
    const [activeTab, setActiveTab] = useState("upload");
  const [rowData, setRowData] = useState<UploadData[]>([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [fileName, setFileName] = useState("");
  //Missing SKU
  const [missingSku, setMissingSku] = useState<string[]>([]);

  // Add a new state for storing the raw uploaded data before validation
  const [rawUploadedData, setRawUploadedData] = useState<UploadData[]>([]);
  const { productStore } = useStore();

  const allValidSKUs = useCallback((products: UploadData[]) => {
    return products.every(product => productStore.getAllSKUs.includes(product.sku));
  }, []);

  const [orderValidateDisable, setOrderValidateDisable] = useState<boolean>(!allValidSKUs(rawUploadedData));

  // Handle sku changes with proper typing
  const handleSkuChange = useCallback((params: NewValueParams<UploadData, number>) => {
    setRowData(prev => {
      const newData = [...prev];
      const rowIndex = params.node?.rowIndex ?? -1;
      if (rowIndex >= 0) {
        newData[rowIndex] = { ...newData[rowIndex], sku: params.newValue?.toString() ?? "" } as UploadData;
      }
      setRawUploadedData(newData);
      setOrderValidateDisable(!allValidSKUs(newData));
      return newData;
    });
  }, []);

  const handleEdit = useCallback((params: ICellRendererParams<UploadData>) => {
    params.api.startEditingCell({
      rowIndex: params.node.rowIndex ?? -1,
      colKey: 'sku'
    });
  }, []);

  // Delete button handler with proper typing
  const handleDelete = useCallback((params: ICellRendererParams<UploadData>) => {
    const rowToDelete = params.data;
    
    if (!rowToDelete) {
      console.warn("No data available for this row");
      return;
    }

    const selectedData = params.api.getSelectedRows();
    const rowsToRemove = selectedData.length > 0 ? selectedData : [rowToDelete];

    // Update the grid
    params.api.applyTransaction({
      remove: rowsToRemove
    });

    // Update your local state
    setRowData(prevData => {
      const newData = prevData.filter(row => 
        !rowsToRemove.some(toRemove => toRemove.sku === row.sku && toRemove.quantity === row.quantity)
      );
      setRawUploadedData(newData); // Update rawUploadedData as well
      setOrderValidateDisable(!allValidSKUs(newData));
      return newData;
    });
  }, []);

  // Column Definitions
  const colDefs = useMemo<ColDef<UploadData>[]>(() => {
    const baseColumns: ColDef<UploadData>[] = [
      { 
        field: "sku", 
        headerName: "SKU",
        flex: 1,
        editable: rowData.length === 0 ? false : true, 
        cellEditor: 'agTextCellEditor',
        onCellValueChanged: rowData.length === 0 ? () => {} : handleSkuChange,
      },
      { 
        field: "quantity", 
        headerName: "Quantity",
        flex: 1
      }
    ];

    // Only add Actions column if rowData has items
    if (rowData.length > 0) {
      baseColumns.push({
        headerName: 'Actions',
        filter: false,
        sortable: false,
        cellRenderer: (params: ICellRendererParams<UploadData>) => (
          <div className='flex'>
            <button 
              onClick={() => handleEdit(params)}
              className="text-blue-600 font-bold py-1 px-1 rounded text-xs">
              <PencilIcon />
            </button>
            <button 
              onClick={() => handleDelete(params)}
              className="text-red-600 font-bold py-1 px-1 rounded text-xs">
              <TrashBinIcon />
            </button>
          </div>
        ),
        flex: 1,
        minWidth: 80,
        maxWidth: 80  
      });
    }

    return baseColumns;
  }, [rowData]); // Recompute when rowData changes

  const defaultColDef = useMemo(() => ({
    sortable: false,
    filter: false,
    resizable: true,
    editable: false, // Default to not editable (override in specific columns)
    suppressSizeToFit: true,
    cellClass: 'empty-cell',
    cellStyle: { borderRight: '1px solid #e2e8f0' }
  }), []);

  // Create empty row data to show grid lines
  const emptyRowData = useMemo(() => {
    return Array(8).fill({ sku: '', quantity: '' });
  }, []);

  const handleFileUpload = (file: File) => {
    setFileName(file.name);
    setValidationError("");
    setRowData([]);
    setFileUploaded(false);
    productStore.UploadedData = [];
    
    parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: ParseResult<Record<string, unknown>>) => {
            const data = results.data;
            
            // Normalize column names
            const normalizedColumns = results.meta.fields?.map(field => 
                field.trim().toLowerCase()
            ) || [];
            
            if (data.length > 0) {
                const hasSku = normalizedColumns.includes('sku');
                const hasQuantity = normalizedColumns.includes('quantity');
                
                if (hasSku && hasQuantity) {
                    // Process and type the data
                    const processedData: UploadData[] = data
                      .map((row: Record<string, unknown>) => {
                          // Get sku value from possible column name variations
                          const sku = (
                              (row['sku '] || 
                                row['sku'] || 
                                row['SKU'] || '') as string
                          ).trim();
                          
                          // Get quantity value from possible column name variations
                          const quantityStr = (
                              (row['quantity '] || 
                                row['quantity'] || 
                                row['Quantity'] || '') as string
                          ).trim();
                          
                          // Convert quantity to number if possible
                          const quantity = isNaN(Number(quantityStr)) ? 0 : Number(quantityStr);
                          
                          return { sku, quantity };
                      })
                      .filter(row => row.sku); // Remove empty rows

                    // Shift "Not Found" SKUs to the start of the array then "Duplicate" SKUs, and finally "Unique" SKUs
                    const organizedSKUs = reorganizeProcessedData(processedData, productStore.getAllSKUs);

                    setRawUploadedData(organizedSKUs);
                    // Validation: Check if all SKUs are valid
                    setOrderValidateDisable(!allValidSKUs(organizedSKUs));
                    setFileUploaded(true);
                } else {
                    setValidationError("File must contain 'sku' and 'quantity' columns");
                    setRawUploadedData([]);
                }
            } else {
                setValidationError("File is empty or invalid format");
                setRawUploadedData([]);
            }
        },
        error: (error: Error) => {
            setValidationError(`Error parsing file: ${error.message}`);
            setRawUploadedData([]);
        }
    });
  };

  //---- Start handle Paste-------
  const handlePasteUpload = (pastedText: string) => {
      setFileName("");
      setValidationError("");
      setRowData([]);
      setFileUploaded(false);
      productStore.UploadedData = [];
      
      try {
          // First try to detect if we have headers
          const firstLine = pastedText.split('\n')[0]!.trim();
          const looksLikeHeaders = firstLine.split('\t').some(part => 
              ['sku', 'quantity'].includes(part.trim().toLowerCase())
          );

          if (looksLikeHeaders) {
              // Parse with headers
              const results = parse<Record<string, unknown>>(pastedText, {
                  header: true,
                  skipEmptyLines: true,
                  dynamicTyping: true
              });
              
              if (results.data.length > 0) {
                  const processedData = processRowsWithHeaders(results.data);
                  const organizedSKUs = reorganizeProcessedData(processedData, productStore.getAllSKUs);
                  updateState(organizedSKUs);
              } else {
                  setValidationError("Pasted data is empty");
              }
          } else {
              // Parse without headers
              const results = parse<string[]>(pastedText, {
                  header: false,
                  skipEmptyLines: true,
                  dynamicTyping: true
              });
              
              if (results.data.length > 0) {
                  const processedData = processRowsWithoutHeaders(results.data);
                  const organizedSKUs = reorganizeProcessedData(processedData, productStore.getAllSKUs);
                  updateState(organizedSKUs);
              } else {
                  setValidationError("Pasted data is empty");
              }
          }
      } catch (error) {
          setValidationError(`Error processing pasted data: ${error instanceof Error ? error.message : String(error)}`);
      }
  };

  // Process data with headers
  const processRowsWithHeaders = (data: Record<string, unknown>[]): UploadData[] => {
      return data.map(row => {
          const sku = String(
              row['sku '] || 
              row['sku'] || 
              row['SKU'] || ''
          ).trim();
          
          let quantity = 0;
          const quantityValue = 
              row['quantity '] || 
              row['quantity'] || 
              row['Quantity'] || 0;
          
          if (typeof quantityValue === 'string') {
              quantity = isNaN(Number(quantityValue.trim())) ? 0 : Number(quantityValue.trim());
          } else if (typeof quantityValue === 'number') {
              quantity = quantityValue;
          }
          
          return { sku, quantity };
      }).filter(row => row.sku);
  };

  // Process data without headers
  const processRowsWithoutHeaders = (rows: string[][]): UploadData[] => {
      return rows.map(row => {
          const sku = String(row[0] || '').trim();
          let quantity = 0;
          
          if (row[1] !== undefined) {
              if (typeof row[1] === 'string') {
                  quantity = isNaN(Number(row[1].trim())) ? 0 : Number(row[1].trim());
              } else if (typeof row[1] === 'number') {
                  quantity = row[1];
              }
          }
          
          return { sku, quantity };
      }).filter(row => row.sku);
  };

  const updateState = (organizedSKUs: UploadData[]) => {
      setRawUploadedData(organizedSKUs);
      setRowData(organizedSKUs);
      setOrderValidateDisable(!allValidSKUs(organizedSKUs));
      setFileUploaded(true);
  };
  //---- End handle Paste-------

  const handlePasteClick = async () => {
    try {
          // Read text from clipboard
          const text = await navigator.clipboard.readText();
          if (text) {
              handlePasteUpload(text);
          } else {
              setValidationError("No data found in clipboard");
          }
      } catch (error) {
          setValidationError(`Failed to read clipboard: ${error instanceof Error ? error.message : String(error)}`);
      }
  };

  const handleProcessFile = () => {
    if (rawUploadedData.length > 0) {
      setRowData(rawUploadedData);
      setValidationError("");
    } else {
      setValidationError("No valid data to validate");
    }
  };

  const handleValidateOrder = () => {
    if(rawUploadedData.length > 0) {
      const removeDuplicatesAndAddQuantity = removeDuplicatesFromUploadData(rawUploadedData);
      productStore.UploadedData = removeDuplicatesAndAddQuantity;
      setValidationError("");
      setActiveTab("table");
    }else {
      setValidationError("No valid data to validate");
    }
  }

  function removeDuplicatesFromUploadData(data: UploadData[]): UploadData[] {
      const skuMap: Record<string, number> = {};

      // Sum quantities for each SKU
      for (const item of data) {
          if(skuMap[item.sku]) {
              skuMap[item.sku]! += item.quantity;
          } else {
              skuMap[item.sku] = item.quantity;
          }
      }

      // Convert the map back to an array of objects
      const result: UploadData[] = Object.keys(skuMap).map(sku => ({
          sku,
          quantity: skuMap[sku]
      })) as UploadData[];

      return result;
  }
  
  const breadcrumbItems = [
    { title: <ButtonLink href="/">Home</ButtonLink> },
    { title: "Bulk Upload" },
  ];

  return (
    <main>
      <div className="container mt-10">
        <div className="mb-6">
          <Breadcrumbs Items={breadcrumbItems} />
        </div>
        <div className="min-h-[70vh] rounded-lg border border-gray-200 bg-white px-5 py-4 dark:border-gray-800 dark:bg-white/[0.03] xl:px-6 mb-6">
        <div className="mx-auto w-full">
          {/* Tabs */}
          <div className="mb-6 flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`-mb-px flex items-center border-b-2 px-4 py-3 text-center text-sm font-medium ${activeTab === "upload" ? "border-primary text-theme dark:border-theme dark:text-theme" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-gray-300"}`}
              onClick={() => setActiveTab("upload")}
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm7.121-12.414a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L7.707 8.707a1 1 0 01-1.414-1.414l3-3z"
                  clipRule="evenodd"
                />
              </svg>
              Upload Spreadsheet
            </button>
            { productStore.UploadedData && productStore.UploadedData.length > 0 && <button
                className={`-mb-px flex items-center border-b-2 px-4 py-3 text-center text-sm font-medium ${activeTab === "table" ? "border-primary text-theme dark:border-theme dark:text-theme" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-gray-300"}`}
                onClick={() => setActiveTab("table")}
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Validated Order
              </button>
            }
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "upload" ? (
              <div>
                <div className="flex flex-col gap-6 lg:flex-row">
                  {/* Upload Section */}
                  <div className="flex-[2] space-y-4 rounded-md border border-gray-200 p-6 dark:border-gray-700">
                    <div className="space-y-1">
                      <h3 className="text-left text-lg font-semibold text-gray-800 dark:text-white/90 sm:text-xl">
                        Upload Your Spreadsheet
                      </h3>
                      <p className="text-left text-sm text-gray-500 dark:text-gray-400">
                        Drag and drop your Excel or CSV file here, or click to browse files
                      </p>
                    </div>
                    <DropzoneComponent onFileUpload={handleFileUpload} fileName={fileName}/>
                    <div className="flex justify-end items-center gap-4">
                      {validationError && (
                        <span className="text-red-500 text-sm">{validationError}</span>
                      )}
                      <button 
                        onClick={handleProcessFile}
                        disabled={!fileUploaded} 
                        className={`inline-flex items-center justify-center font-medium gap-2 rounded-md transition bg-brand text-black shadow-theme-xs hover:bg-yellow-400 disabled:bg-gray-300 px-3 py-1`}
                      >
                        Process File
                      </button>
                    </div>
                  </div>

                  {/* Preview Section */}
                  <div className="flex-[3] space-y-4 rounded-md border border-gray-200 p-6 dark:border-gray-700">
                    <div className="flex justify-between">
                      <div className="space-y-1">
                        <h3 className="text-left text-lg font-semibold text-gray-800 dark:text-white/90 sm:text-xl">
                          Data Preview / Data Paste
                        </h3>
                        <p className="text-left text-sm text-gray-500 dark:text-gray-400">
                          Preview / Paste your data
                        </p>
                      </div>
                      <div className="space-y-1 flex flex-col justify-center">
                        <div className="flex items-center gap-2">
                          <p className="text-left text-sm text-gray-500 dark:text-gray-400">
                            Duplicate SKUs
                          </p>
                          <div className="bg-[#ffe066] w-4 h-4"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-left text-sm text-gray-500 dark:text-gray-400">
                            SKU Not Found
                          </p>
                          <div className="bg-[#ff8787] w-4 h-4"></div>
                        </div>
                      </div>
                    </div>
                    <div 
                      className="relative ag-theme-balham dark:ag-theme-alpine-dark excel-style-grid" 
                      style={{ 
                        height: 280, 
                        width: '100%',
                        // Add CSS variables directly
                        '--ag-header-background-color': 'black',
                        '--ag-header-foreground-color': '#FFD20A',
                        '--ag-header-height': '47px',
                        '--ag-header-font-size': '14px',
                        '--ag-header-cell-hover-background-color': 'rgba(80, 40, 140, 0.66)',
                        '--ag-border-color': '#e2e8f0',
                        '--ag-row-border-width': '1px',
                        '--ag-row-border-color': '#e2e8f0',
                        '--ag-row-hover-color': '#d0ebff',
                        '--ag-odd-row-background-color': '#ffffff',
                      } as React.CSSProperties}
                    >
                      <AgGridReact
                        rowData={rowData.length ? rowData : emptyRowData}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                        theme={withAddOns}
                        suppressCellFocus={true}
                        onGridReady={(params) => {
                          params.api.sizeColumnsToFit();
                        }}
                        getRowStyle = {(params) => {
                          if (!params.data?.sku) return undefined;
                          if (!productStore.getAllSKUs.includes(params.data.sku ?? "")) {
                            const missingSKU = params.data.sku;
                            // Only add the SKU if it's not already in the missingSku array
                            setMissingSku((prev) => {
                              if (!prev.includes(missingSKU)) {
                                return [...prev, missingSKU];
                              }
                              return prev; // Skip if already present
                            });

                            return { backgroundColor: '#ff8787' };
                          }
                          const skuCount = rowData.filter(item => item.sku === params.data.sku).length;
                          return skuCount > 1 ? { backgroundColor: '#ffe066' } : undefined;
                        }}
                        suppressNoRowsOverlay={true}
                        suppressHorizontalScroll={true}
                        domLayout={'normal'}
                      />
                      {
                        rowData.length === 0 ?
                        <button 
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center font-medium gap-2 rounded-md transition bg-white text-black shadow-theme-xs px-4 py-2"
                          style={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}
                          onClick={handlePasteClick}
                        >
                          Paste SKUs & Quantities
                        </button> : null
                      }   
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6 lg:flex-row">
                  <div className="flex-2"></div>
                  <div className="flex-3 w-full flex justify-between items-center min-h-12 pl-4 gap-4">
                    <div>
                    {missingSku.length > 0 && (
                          <span className="mt-4 text-sm text-red-500 flex items-center">
                            Delete SKUs in red to proceed: {missingSku.map((e, index) => (
                              <span key={index} className="mx-1 font-medium">{e} {index===missingSku.length -1  ? "" : ", "}</span>
                            ))}
                          </span>
                    )}
                    </div>
                    {rowData.length > 0 && 
                      <button 
                        onClick={handleValidateOrder}
                        disabled={orderValidateDisable}
                        className={`inline-flex mt-4 items-center justify-center font-medium gap-2 rounded-md transition bg-blue-600 text-white shadow-theme-xs hover:bg-blue-700 disabled:bg-gray-300 px-4 py-2`}
                      >
                        Validate Order
                      </button>
                    }
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <ValidateProductsAgGrid products={productStore.findUploadedProductsFromAllProducts( productStore.UploadedData.length > 0 ? productStore.UploadedData : [])}/>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </main>
  );
};

export default bulkOrder;
