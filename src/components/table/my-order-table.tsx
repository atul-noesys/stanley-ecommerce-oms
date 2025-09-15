import React, { useMemo, useState } from "react";
import Badge from "../badge/Badge";
import { numberFormatter } from "@/store/product-store";
import { Filter, Order } from "@/app/(home)/my-order/page";
import Image from "next/image";
import { Modal } from "../modal";

const renderProduct = (item: Order, handleRowClick: (order: Order) => void) => {
  const {
    "SAP Order": sapOrder,
    "OMS Order": omsOrder,
    "Order Date": orderDate,
    "Total SKUs": totalSkus,
    "Order Quantity": orderQuantity,
    "Total Back Order": totalBackOrder,
    "Gross Value": grossValue,
    Status: status,
    "Delivery Code": deliveryCode,
  } = item;

  return (
    <tr
      key={`${sapOrder}-${omsOrder}`}
      className="border-b border-neutral-300 dark:border-neutral-500 cursor-pointer"
      onClick={() => handleRowClick(item)}
    >
      <td className="hidden p-4 lg:table-cell">
        <span>{sapOrder}</span>
      </td>

      <td className="hidden p-4 lg:table-cell">
        <span>{omsOrder}</span>
      </td>

      <td className="hidden p-4 lg:table-cell">
        <span>{orderDate}</span>
      </td>

      <td className="hidden p-4 lg:table-cell">
        <span>{totalSkus}</span>
      </td>

      <td className="hidden p-4 lg:table-cell">
        <span>{numberFormatter(orderQuantity)}</span>
      </td>

      <td className="hidden p-4 lg:table-cell">
        <span>{numberFormatter(orderQuantity - totalBackOrder)}</span>
      </td>

      <td className="hidden p-4 lg:table-cell">
        <span>{numberFormatter(totalBackOrder)}</span>
      </td>

      <td className="hidden p-4 lg:table-cell">
        <span className="font-medium">${numberFormatter(grossValue)}</span>
      </td>

      <td className="hidden p-4 lg:table-cell">
        <Badge
          color={
            status === "Confirmed"
              ? "success"
              : status === "Canceled"
                ? "error"
                : "warning"
          }
        >
          {status}
        </Badge>
      </td>

      <td className="hidden p-4 lg:table-cell">
        <span>{deliveryCode}</span>
      </td>
    </tr>
  );
};

const MyOrderTable = ({
  filteredData,
  appliedFilter,
}: {
  filteredData: Order[];
  appliedFilter: Filter;
}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Cart Details Search
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter cart items based on search term
  const filteredCartItems = useMemo(() => {
    if (!selectedOrder || !searchTerm)
      return selectedOrder?.["Cart Details"] || [];

    const term = searchTerm.toLowerCase();
    return selectedOrder["Cart Details"].filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.sku.toLowerCase().includes(term),
    );
  }, [selectedOrder, searchTerm]);

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
    setSearchTerm(""); // Reset search term when opening a new order
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setSearchTerm("");
  };

  return (
    <>
      <table className="table w-full">
        <thead className="sticky top-0 z-10 mb-2 border-b border-neutral-200 bg-black text-brand">
          <tr className="text-left text-sm text-brand">
            <th scope="col" className="hidden w-2/18 p-4 lg:table-cell">
              SAP Order #
            </th>
            <th scope="col" className="hidden w-2/18 p-4 lg:table-cell">
              OMS Order #
            </th>
            <th scope="col" className="hidden w-2/18 p-4 lg:table-cell">
              Order Date
            </th>
            <th scope="col" className="hidden w-2/18 p-4 lg:table-cell">
              Total SKUs
            </th>
            <th scope="col" className="hidden w-2/18 p-4 lg:table-cell">
              Order Quantity
            </th>
            <th scope="col" className="hidden w-2/18 p-4 lg:table-cell">
              Confirmed Quantity
            </th>
            <th scope="col" className="hidden w-2/18 p-4 lg:table-cell">
              Open Quantity
            </th>
            <th scope="col" className="hidden w-2/18 p-4 lg:table-cell">
              Gross Value
            </th>
            <th scope="col" className="hidden w-2/18 p-4 lg:table-cell">
              Status
            </th>
            <th scope="col" className="hidden w-2/18 p-4 lg:table-cell">
              Delivery Number
            </th>
          </tr>
        </thead>
        <tbody className="space-y-2">
          {filteredData.map((item) => renderProduct(item, handleRowClick))}
        </tbody>
      </table>
      {/* Modal for Cart Details */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className="max-w-6xl h-[460px]"
      >
        {selectedOrder && (
          <>
            <div className="text-md p-4 flex justify-between items-center">
              <div className="flex gap-6">
                <div>
                  SAP Order # :{" "}
                  <span className="text-green-800 font-semibold">
                    {selectedOrder["SAP Order"]}
                  </span>
                </div>
                <div>
                  OMS Order # :{" "}
                  <span className="text-green-800 font-semibold">
                    {selectedOrder["OMS Order"]}
                  </span>
                </div>
              </div>
              <div className="relative">
                <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
                  <svg
                    className="fill-gray-500 dark:fill-gray-400"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                      fill=""
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search Item by Name / SKU"
                  className="dark:bg-dark-900 h-9 w-[300px] rounded-lg border border-gray-200 bg-white py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-500 focus:border-blue-700 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-blue-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => {
                      setSearchTerm("");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}
              </div>
            </div>
            <div className="h-[350px] overflow-y-auto">
              <table className="w-full">
                <thead className="bg-black dark:bg-gray-800">
                  <tr>
                    <th className="xl:min-w-100 px-4 py-3 text-left text-sm font-bold text-brand dark:text-gray-400">
                      Product
                    </th>
                    <th className="xl:w-32 px-4 py-3 text-left text-sm font-bold text-brand dark:text-gray-400">
                      Unit Price
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-brand dark:text-gray-400">
                      Delivery Status
                    </th>
                    <th className="xl:w-36 px-4 py-3 text-left text-sm font-bold text-brand dark:text-gray-400">
                      Order Quantity
                    </th>
                    <th className="xl:w-28 px-4 py-3 text-left text-sm font-bold text-brand dark:text-gray-400">
                      Back Order
                    </th>
                    <th className="xl:w-28 px-4 py-3 text-left text-sm font-bold text-brand dark:text-gray-400">
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredCartItems.length > 0 ? (
                    filteredCartItems.map((product) => (
                      <tr
                        key={product.sku}
                        className={`${appliedFilter.sku === product.sku ? "bg-yellow-200" : ""}`}
                      >
                        <td className="xl:min-w-100 px-4 py-2">
                          <div className="flex items-center">
                            <Image
                              src={product.image}
                              alt={product.name}
                              className="h-12 w-12 lg:h-16 lg:w-16 rounded-md object-cover"
                              width={40}
                              height={40}
                            />
                            <div className="ml-4 hidden lg:flex lg:flex-col">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {product.name}
                              </div>
                              <div className="flex justify-start items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <div>SKU: {product.sku}</div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2 xl:w-32 text-sm font-medium text-gray-900 dark:text-white">
                          ${product.price}
                        </td>
                        <td className="px-4 py-2 xl:w-40 text-sm font-medium text-gray-900 dark:text-white">
                          <Badge size="sm" color={"success"}>
                            Confirmed
                          </Badge>
                        </td>
                        <td className="px-4 py-2 xl:w-40 text-sm font-medium text-gray-900 dark:text-white">
                          {numberFormatter(product.quantity)}
                        </td>
                        <td className="px-4 py-2 xl:w-36 text-sm font-medium text-yellow-500 dark:text-white">
                          {numberFormatter(product.backOrder)}
                        </td>
                        <td className="px-4 py-2 xl:w-40 text-sm font-medium text-gray-900 dark:text-white">
                          $
                          {numberFormatter(
                            parseFloat(
                              ((product.quantity || 1) * product.price).toFixed(
                                2,
                              ),
                            ),
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-32 text-center text-gray-500 dark:text-gray-400"
                      >
                        {searchTerm
                          ? "No product found"
                          : "No products available"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="text-md py-4 px-5 flex justify-end gap-8 bg-gray-100">
              <div>
                Total SKUS :{" "}
                <span className="text-blue-700 font-semibold">
                  {numberFormatter(selectedOrder["Total SKUs"])}
                </span>
              </div>
              <div>
                Total Quantity :{" "}
                <span className="text-blue-700 font-semibold">
                  {numberFormatter(selectedOrder["Order Quantity"])}
                </span>
              </div>
              <div>
                Open Quantity :{" "}
                <span className="text-yellow-500 font-semibold">
                  {numberFormatter(selectedOrder["Total Back Order"])}
                </span>
              </div>
              <div>
                Gross Value :{" "}
                <span className="text-blue-700 font-semibold">
                  ${numberFormatter(selectedOrder["Gross Value"])}
                </span>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default MyOrderTable;
