"use client";

import { useStore } from '@/store/store-context';
import {
  CellValueChangedEvent,
  ColDef,
  GridOptions,
  ICellRendererParams,
  NewValueParams,
  ValueFormatterParams
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { AgGridReact } from 'ag-grid-react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { PencilIcon , TrashBinIcon } from "@/icons/index";
import { Cart, Product } from '@/store/product-store';

type UploadProduct = Product & {
  quantity: number;
}

function convertProductsToCart(products: UploadProduct[]): Cart[] {
  const newCartProducts = products.map(product => ({
    sku: product.sku,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: product.quantity,
    soh: product.soh,
    backOrder: product.quantity > product.soh ? product.quantity - product.soh : 0,
    moq: product.moq
  }));

  return newCartProducts;
}

const ValidateProductsAgGrid = observer(({ products } :  { products : UploadProduct[]}) => {
  const [rowData, setRowData] = useState<UploadProduct[]>(products);
  const router = useRouter(); 

  const allQuantitiesValid = useCallback((products: UploadProduct[]) => {
    return products.every(product => (product.quantity ?? 0) <= (product.soh ?? 0));
  }, []);

  const [addToCartButtonDisable, setAddToCartButtonDisable] = useState<boolean>(!allQuantitiesValid(products));
  const [acceptBackOrder, setAcceptBackOrder] = useState<boolean>(false);
  const { productStore } = useStore();

  // Handle quantity changes with proper typing
  const handleQuantityChange = useCallback((params: NewValueParams<UploadProduct, number>) => {
    setRowData(prev => {
      const newData = [...prev];
      const rowIndex = params.node?.rowIndex ?? -1;
      if (rowIndex >= 0) {
        newData[rowIndex] = { ...newData[rowIndex], quantity: params.newValue ?? 0 } as UploadProduct;;
      }
      setAddToCartButtonDisable(!allQuantitiesValid(newData));
      return newData;
    });
    
  }, []);

  // Edit button handler with proper typing
  const handleEdit = useCallback((params: ICellRendererParams<UploadProduct>) => {
    params.api.startEditingCell({
      rowIndex: params.node.rowIndex ?? -1,
      colKey: 'quantity'
    });
  }, []);

  // Delete button handler with proper typing
  const handleDelete = useCallback((params: ICellRendererParams<UploadProduct>) => {
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
        !rowsToRemove.some(toRemove => toRemove.id === row.id)
      );

      setAddToCartButtonDisable(!allQuantitiesValid(newData));
      return newData;
    });
  }, []);

  const handleAddToCart = () => {
      productStore.bulkAddProductsToCart(convertProductsToCart(rowData));
      router.push('/checkout'); 
  };
  
  const cellStyle = () => ({
      height: "35",
      display: "flex",
      alignItems: "center",
    });

  // Column definitions with proper typing
  const [columnDefs] = useState<ColDef<UploadProduct>[]>([
    { 
      field: 'sku', 
      headerName: 'SKU', 
      filter: false, 
      sortable: false, 
      cellStyle,
      flex: 1,  // Uses flex to distribute width
      minWidth: 120  // Minimum width
    },
    { 
      field: 'name', 
      headerName: 'Product Name', 
      filter: false,
      sortable: false,
      cellStyle,
      flex: 3,  // More flex for wider columns
      minWidth: 200
    },
    { 
      field: 'soh', 
      headerName: 'Stock On Hand', 
      filter: false,
      sortable: false,
      cellStyle,
      flex: 1,
      minWidth: 120
    },
    {
      field: 'quantity', 
      headerName: 'Quantity', 
      filter: false,
      sortable: false,
      editable: true,
      cellStyle,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0,
        max: (params: {data: UploadProduct}) => params.data?.soh || 0,
        precision: 0,
        step: 1,
        showStepperButtons: true
      },
      onCellValueChanged: handleQuantityChange,
      flex: 1,
      minWidth: 100
    },
    {
      headerName: 'Back Order', 
      filter: false,
      sortable: false,
      valueGetter: (params) => {
        const quantity = params.data?.quantity || 0;
        const soh = params.data?.soh || 0;
        return quantity > soh ? quantity - soh : "";
      },
      cellStyle,
      flex: 1,
      minWidth: 100
    },
    { 
      field: 'price', 
      headerName: 'Unit Price', 
      filter: false,
      sortable: false,
      valueFormatter: (params: ValueFormatterParams<UploadProduct, number>) => 
        `$${params.value?.toFixed(2) ?? '0.00'}`,
      cellStyle,
      flex: 1,
      minWidth: 100
    },
    { 
      headerName: 'Total Price',
      filter: false,
      sortable: false,
      valueGetter: (params) => (params.data?.price || 0) * (params.data?.quantity || 0),
      valueFormatter: (params: ValueFormatterParams<UploadProduct, number>) => 
        `$${(params.value || 0).toFixed(2)}`,
      cellStyle,
      flex: 1,
      minWidth: 120
    },
    {
      headerName: 'Actions',
      filter: false,
      sortable: false,
      cellRenderer: (params: ICellRendererParams<UploadProduct>) => (
        <div className='flex'>
          <button 
            onClick={() => handleEdit(params)}
            className="text-blue-600 font-bold py-1 px-1 rounded text-xs"
          >
            <PencilIcon />
          </button>
          <button 
            onClick={() => handleDelete(params)}
            className="text-red-600 font-bold py-1 px-1 rounded text-xs"
          >
            <TrashBinIcon />
          </button>
        </div>
      ),
      cellStyle,
      flex: 1,
      minWidth: 80,
      maxWidth: 80  
    }
  ]);

  const defaultColDef: ColDef<UploadProduct> = {
    sortable: true,
    filter: true,
    resizable: true,
    wrapText: true,
  };

  // Handle the CellValueChangedEvent separately
  const onCellValueChanged = useCallback((event: CellValueChangedEvent<UploadProduct>) => {
    // You can add additional logic here if needed
    console.log('Cell value changed:', event);
  }, []);

  const gridOptions: GridOptions<UploadProduct> = {
    rowData: rowData,
    columnDefs: columnDefs,
    defaultColDef: {
        ...defaultColDef,
    },
    suppressCellFocus: true,
    //domLayout: 'normal',
    getRowHeight: () => 35,
    getRowStyle: (params) => {
      if ((params.data?.quantity ?? 0) > (params.data?.soh ?? 0)) {
        return { backgroundColor: '#ffe066' };
      }
      return undefined;
    },
    onCellValueChanged: onCellValueChanged
  };

  return (
    <div>
        <div className="ag-theme-balham" 
        style={{ 
          height: 400, 
          width: '100%',
          marginBottom: 16,
          // Add CSS variables directly
          '--ag-header-background-color': 'black',
          '--ag-header-foreground-color': '#FFD20A',
          '--ag-header-height': '47px',
          '--ag-header-font-size': '14px',
          '--ag-border-color': '#e2e8f0',
          '--ag-row-border-width': '1px',
          '--ag-row-border-color': '#e2e8f0',
          '--ag-row-hover-color': '#d0ebff',
          '--ag-odd-row-background-color': '#ffffff',
        } as React.CSSProperties} >
            <AgGridReact<UploadProduct>
            {...gridOptions}
            />
        </div>
        <div className="w-full flex justify-end gap-6">
            {addToCartButtonDisable && 
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="acceptBackOrder"
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onChange={(e) => setAcceptBackOrder(e.target.checked)}
                />
                <label htmlFor="acceptBackOrder" className="ml-2 text-base text-gray-700">
                  Accept All Back Order
                </label>
              </div>
            }
            <button 
                onClick={handleAddToCart}
                disabled={!acceptBackOrder && addToCartButtonDisable}
                className={`inline-flex items-center justify-center font-medium gap-2 rounded-lg transition bg-blue-600 text-white shadow-theme-xs hover:bg-blue-700 disabled:bg-gray-300 disabled:text-white px-4 py-2`}
                >
                Add to Cart
            </button>
        </div>
    </div>
  );
});

export default ValidateProductsAgGrid;