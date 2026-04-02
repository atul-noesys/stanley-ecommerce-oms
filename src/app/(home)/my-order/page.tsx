"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import Input from "@/components/form/InputField";
import Label from "@/components/form/Label";
import MyOrderTable from "@/components/table/my-order-table";
import ButtonLink from "@/shared/Button/ButtonLink";
import { Cart } from "@/store/product-store";
import { useStore } from "@/store/store-context";
import { useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

export interface Order {
  sap_order: string;
  oms_order: string;
  order_date: string;
  total_skus: number;
  order_quantity: number;
  total_back_order: number;
  gross_value: number;
  status: string;
  credit_status: string;
  delivery_code: string;
  cart_details: Cart[];
}

export type Filter = {
  sapOrder: string;
  skuOrder: string;
  sku: string;
  status: string;
  startDate: string;
  endDate: string;
};

const MyOrderPage = observer(() => {
  const { nguageStore } = useStore();
  // Fetch current cart items to check for duplicates
  const { data: MyOrdersData } = useQuery({
    queryKey: ["MyOrders"],
    queryFn: async () => {
      const paginationData = await nguageStore.GetPaginationData({
        table: "customer_order_list",
        skip: 0,
        take: null,
        NGaugeId: "75",
      });
      const result = Array.isArray(paginationData) ? paginationData : (paginationData?.data || []);
      return result || [];
    },
    staleTime: 0,
    enabled: true,
  });

  // Transform API data by parsing stringified cart_details
  const transformedOrderData = (MyOrdersData || []).map((item: any) => ({
    ...item,
    cart_details: typeof item.cart_details === "string" ? JSON.parse(item.cart_details) : item.cart_details,
  })) as Order[];

  const [filters, setFilters] = useState<Filter>({
    sapOrder: "",
    skuOrder: "",
    sku: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const [filteredData, setFilteredData] = useState<Order[]>(transformedOrderData);

  // Update filteredData when transformedOrderData changes
  useEffect(() => {
    setFilteredData(transformedOrderData);
  }, [transformedOrderData]);

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
    const filtered = transformedOrderData.filter((order) => {
      // sap_order filter
      if (
        filters.sapOrder &&
        !order["sap_order"]
          .toLowerCase()
          .includes(filters.sapOrder.toLowerCase())
      ) {
        return false;
      }

      // Smart Order filter
      if (
        filters.skuOrder &&
        !order["oms_order"]
          .toLowerCase()
          .includes(filters.skuOrder.toLowerCase())
      ) {
        return false;
      }

      // SKU filter - check if any item in Cart Details matches the SKU filter
      if (filters.sku) {
        const skuFound = order["cart_details"].some((item) =>
          item.sku.toLowerCase().includes(filters.sku.toLowerCase()),
        );
        if (!skuFound) return false;
      }

      // status filter
      if (filters.status && order.status !== filters.status) {
        return false;
      }

      // Date range filter
      const orderDate = new Date(order["order_date"]);
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
    setFilteredData(transformedOrderData);
  };

  const breadcrumbItems = [
    { title: <ButtonLink href="/">Home</ButtonLink> },
    { title: "My Order" },
  ];

  return (
    <main className="nc-CartPage">
      <div className="container pb-8">
        <Breadcrumbs Items={breadcrumbItems} />

        <div className="pt-4">
          {/* Filter Section */}
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
              {/* sap_order Filter */}
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

              {/* oms_order Filter */}
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

              {/* status Filter */}
              {/* <div>
                <Label>status</Label>
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
            <div className="mt-2 flex justify-end space-x-3">
              <button
                className="rounded-lg bg-gray-200 px-6 py-2 font-semibold text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
              <button
                className="rounded-lg bg-brand px-6 py-2 font-semibold text-white hover:bg-brand/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="mt-4 h-[365px] overflow-y-auto w-full divide-y divide-neutral-300 bg-white dark:bg-neutral-900">
            <MyOrderTable filteredData={filteredData} appliedFilter={filters} />
          </div>
        </div>
      </div>
    </main>
  );
});

export default MyOrderPage;
