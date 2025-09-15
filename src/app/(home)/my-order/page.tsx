"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import Input from "@/components/form/InputField";
import Label from "@/components/form/Label";
import MyOrderTable from "@/components/table/my-order-table";
import ButtonLink from "@/shared/Button/ButtonLink";
import { Cart } from "@/store/product-store";
import { observer } from "mobx-react-lite";
import { useState } from "react";

export interface Order {
  "SAP Order": string;
  "OMS Order": string;
  "Order Date": string;
  "Total SKUs": number;
  "Order Quantity": number;
  "Total Back Order": number;
  "Gross Value": number;
  Status: string;
  "Credit Status": string;
  "Delivery Code": string;
  "Cart Details": Cart[];
}

const cartDetails: Cart[] = [
  {
    sku: "SWKBN1250",
    name: "STANLEY® FATMAX® 16 ft. x 1-1/4 in. Premium Tape",
    price: 99.99,
    image:
      "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMHT38316S/FMHT38316S_2.jpg?resize=530x530",
    quantity: 50,
    soh: 10000,
    backOrder: 0,
    moq: 50,
  },
  {
    sku: "51-124X",
    name: "FatMax® Welded Hammer (14 oz)",
    price: 79.99,
    image:
      "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/51-124X/51-124_2.jpg?resize=530x530",
    quantity: 100,
    soh: 20000,
    backOrder: 0,
    moq: 100,
  },
  {
    sku: "SF44-356H",
    name: "STANLEY® FATMAX® 380mm x 11TPI Blade Armour Saw",
    price: 59.99,
    image:
      "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/20-046/20-046_1.jpg?resize=530x530",
    quantity: 500,
    soh: 6000,
    backOrder: 0,
    moq: 250,
  },
  {
    sku: "STHT10432",
    name: "CONTROL-GRIP™ Retractable Utility Knife",
    price: 29.99,
    image:
      "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHT10432/STHT10432_1.jpg?resize=530x530",
    quantity: 100,
    soh: 5000,
    backOrder: 0,
    moq: 100,
  },
  {
    sku: "AW90-947",
    name: "150mm/6 in MAXSTEEL™ Adjustable Wrench",
    price: 59.99,
    image:
      "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/90-947/90-947_1.jpg?resize=530x530",
    quantity: 2000,
    soh: 50000,
    backOrder: 0,
    moq: 1000,
  },
];

const cartDetails1: Cart[] = [
  {
    sku: "STST11552",
    name: "33-1/2 in x 23-1/2 in Fold-Up Workbench",
    price: 49.99,
    image:
      "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STST11552/STST11552_1.jpg?resize=530x530",
    quantity: 500,
    soh: 6000,
    backOrder: 0,
    moq: 250,
  },
  {
    sku: "BDS91929",
    name: "FATMAX 7-Pattern Front Trigger Nozzle",
    price: 49.99,
    image:
      "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/BDS91929/BDS91929_1.jpg?resize=530x530",
    soh: 20000,
    moq: 500,
    quantity: 100,
    backOrder: 0,
  },
  {
    sku: "BDS8317",
    name: "1200 lb Poly Cart",
    price: 38.99,
    image:
      "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/BDS8317/BDS8317_1.jpg?resize=530x530",
    soh: 3000,
    moq: 100,
    quantity: 500,
    backOrder: 0,
  },
  {
    sku: "STHV215BW",
    name: "Cordless Handheld Wet/Dry Vacuum",
    price: 79.99,
    image:
      "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/STHV215BW/STHV215BW_1.jpg?resize=530x530",
    soh: 5000,
    moq: 500,
    quantity: 100,
    backOrder: 0,
  },
  {
    sku: "FMST26322",
    name: "26 in STANLEY® FATMAX® PRO Toolbox",
    price: 59.99,
    image:
      "https://www.stanleytools.com/NAG/PRODUCT/IMAGES/HIRES/FMST26322/FMST26322_1.jpg?resize=530x530",
    quantity: 2000,
    backOrder: 0,
    soh: 8000,
    moq: 250,
  },
];

const initialTableData: Order[] = [
  {
    "SAP Order": "SAP586985",
    "OMS Order": "OMS25896",
    "Order Date": "2025-07-11",
    "Total SKUs": 175,
    "Order Quantity": 5684,
    "Total Back Order": 0,
    "Gross Value": 785698,
    Status: "Confirmed",
    "Credit Status": "Not Relevant",
    "Delivery Code": "59682864",
    "Cart Details": cartDetails,
  },
  {
    "SAP Order": "SAP158965",
    "OMS Order": "OMS56896",
    "Order Date": "2025-07-12",
    "Total SKUs": 112,
    "Order Quantity": 7890,
    "Total Back Order": 550,
    "Gross Value": 845636,
    Status: "Pending",
    "Credit Status": "Not Relevant",
    "Delivery Code": "67587856",
    "Cart Details": cartDetails1,
  },
  {
    "SAP Order": "SAP126985",
    "OMS Order": "OMS47589",
    "Order Date": "2025-07-12",
    "Total SKUs": 85,
    "Order Quantity": 1856,
    "Total Back Order": 1200,
    "Gross Value": 454569,
    Status: "Canceled",
    "Credit Status": "Rejected",
    "Delivery Code": "45237589",
    "Cart Details": cartDetails,
  },
  {
    "SAP Order": "SAP394682",
    "OMS Order": "OMS15973",
    "Order Date": "2025-07-13",
    "Total SKUs": 175,
    "Order Quantity": 5684,
    "Total Back Order": 1350,
    "Gross Value": 785698,
    Status: "Confirmed",
    "Credit Status": "Not Relevant",
    "Delivery Code": "88025896",
    "Cart Details": cartDetails,
  },
  {
    "SAP Order": "SAP589614",
    "OMS Order": "OMS99456",
    "Order Date": "2025-07-13",
    "Total SKUs": 112,
    "Order Quantity": 7890,
    "Total Back Order": 2500,
    "Gross Value": 845636,
    Status: "Confirmed",
    "Credit Status": "Not Relevant",
    "Delivery Code": "77514696",
    "Cart Details": cartDetails,
  },
];

export type Filter = {
  sapOrder: string;
  skuOrder: string;
  sku: string;
  status: string;
  startDate: string;
  endDate: string;
};

const MyOrderPage = observer(() => {
  const [filters, setFilters] = useState<Filter>({
    sapOrder: "",
    skuOrder: "",
    sku: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const [filteredData, setFilteredData] = useState<Order[]>(initialTableData);

  // const options = [
  //   { value: "Confirmed", label: "Confirmed" },
  //   { value: "Pending", label: "Pending" },
  //   { value: "Canceled", label: "Canceled" },
  // ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSelectChange = (value: string) => {
  //   setFilters(prev => ({ ...prev, status: value }));
  // };

  // const handleStartDateChange = (dateString: string) => {
  //   setFilters(prev => ({ ...prev, startDate: dateString }));
  // };

  // const handleEndDateChange = (dateString: string) => {
  //   setFilters(prev => ({ ...prev, endDate: dateString }));
  // };

  const applyFilters = () => {
    console.log("Applying Filters:", filters);
    const filtered = initialTableData.filter((order) => {
      // SAP Order filter
      if (
        filters.sapOrder &&
        !order["SAP Order"]
          .toLowerCase()
          .includes(filters.sapOrder.toLowerCase())
      ) {
        return false;
      }

      // Smart Order filter
      if (
        filters.skuOrder &&
        !order["OMS Order"]
          .toLowerCase()
          .includes(filters.skuOrder.toLowerCase())
      ) {
        return false;
      }

      // SKU filter - check if any item in Cart Details matches the SKU filter
      if (filters.sku) {
        const skuFound = order["Cart Details"].some((item) =>
          item.sku.toLowerCase().includes(filters.sku.toLowerCase()),
        );
        if (!skuFound) return false;
      }

      // Status filter
      if (filters.status && order.Status !== filters.status) {
        return false;
      }

      // Date range filter
      const orderDate = new Date(order["Order Date"]);
      if (filters.startDate && filters.endDate) {
        const startDate = new Date(filters.startDate);
        const endDate = new Date(filters.endDate);
        if (orderDate < startDate || orderDate > endDate) {
          return false;
        }
      } else if (filters.startDate) {
        const startDate = new Date(filters.startDate);
        if (orderDate < startDate) {
          return false;
        }
      } else if (filters.endDate) {
        const endDate = new Date(filters.endDate);
        if (orderDate > endDate) {
          return false;
        }
      }

      return true;
    });

    setFilteredData(filtered);
  };

  const resetFilters = () => {
    setFilters({
      sapOrder: "",
      skuOrder: "",
      sku: "",
      status: "",
      startDate: "",
      endDate: "",
    });
    setFilteredData(initialTableData);
  };

  const breadcrumbItems = [
    { title: <ButtonLink href="/">Home</ButtonLink> },
    { title: "My Order" },
  ];

  return (
    <main className="nc-CartPage">
      <div className="container pb-8 lg:pb-24">
        <Breadcrumbs Items={breadcrumbItems} />

        <div className="pt-4">
          {/* Filter Section */}
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
              {/* SAP Order Filter */}
              <div>
                <Label>SAP Order #</Label>
                <Input
                  type="text"
                  name="sapOrder"
                  placeholder="Filter by SAP Order"
                  value={filters.sapOrder}
                  onChange={handleInputChange}
                />
              </div>

              {/* OMS Order Filter */}
              <div>
                <Label>OMS Order #</Label>
                <Input
                  type="text"
                  name="skuOrder"
                  placeholder="Filter by OMS Order #"
                  value={filters.skuOrder} // Change from defaultValue to value
                  onChange={handleInputChange}
                />
              </div>

              {/* SKU code Filter */}
              <div>
                <Label>SKU Code</Label>
                <Input
                  type="text"
                  name="sku"
                  placeholder="Filter by SKU Code"
                  value={filters.sku}
                  onChange={handleInputChange}
                />
              </div>

              {/* Status Filter */}
              {/* <div>
                <Label>Status</Label>
                <div className="relative">
                  <Select
                    options={options}
                    placeholder="Select Option"
                    onChange={handleSelectChange}
                    className="dark:bg-dark-900"
                  />
                  <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                    <ChevronDownIcon/>
                  </span>
                </div>
              </div> */}

              {/* Date Range Filter */}
              {/* <div className="md:col-span-2">
                <Label>Order Date Range</Label>
                <div className="flex items-center space-x-2">
                  <DatePicker
                    id="date-picker"
                    placeholder="Start date"
                    onChange={(_, currentDateString) => handleStartDateChange(currentDateString)}
                  />
                  <span className="text-gray-500">to</span>
                  <DatePicker
                    id="date-picker"
                    placeholder="End date"
                    onChange={(_, currentDateString) => handleEndDateChange(currentDateString)}
                  />
                </div>
              </div> */}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-end space-x-3">
              <button
                className="rounded-lg bg-black px-6 py-3 font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
              <button
                className="rounded-lg bg-brand px-6 py-3 font-semibold text-black hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="mt-4 mb-8 max-h-[360px] overflow-y-auto w-full divide-y divide-neutral-300 bg-white dark:bg-neutral-900">
            <MyOrderTable filteredData={filteredData} appliedFilter={filters} />
          </div>
        </div>
      </div>
    </main>
  );
});

export default MyOrderPage;
