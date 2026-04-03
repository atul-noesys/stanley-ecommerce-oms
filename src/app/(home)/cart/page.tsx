"use client";

import Badge from "@/components/badge/Badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import ButtonLink from "@/shared/Button/ButtonLink";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SmallQuantityInputNumber from "@/shared/InputNumber/small-input-counter";
import { useStore } from "@/store/store-context";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { debounce } from "lodash";
import Image from "next/image";
import { useMemo, useState } from "react";
import { MdDelete, MdSync } from "react-icons/md";
import { toast } from "react-toastify";

const renderProduct = (
  item: any,
  onQuantityChange: (sku: string, quantity: number) => void,
  onUpdate: (item: any, newQuantity: number) => Promise<void>,
  isUpdating: boolean,
  changedQuantities: Record<string, number>,
  onDelete: (item: any) => Promise<void>
) => {
  const { product_name, sku, image, back_order, minimum_order_quantity, price, quantity: originalQuantity, stock_in_hand } = item;
  const currentQuantity = changedQuantities[sku] !== undefined ? changedQuantities[sku] : originalQuantity;
  const hasQuantityChanged = currentQuantity !== originalQuantity;

  return (
    <tr
      key={product_name}
      className="border-b border-neutral-300 dark:border-neutral-500"
    >
      <td className="py-2 p-4">
        <div className="flex items-center gap-3">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-sm">
            <Image
              fill
              src={image}
              alt={product_name}
              className="size-full object-contain object-center"
            />
          </div>
          <div className="leading-tight">
            <p className="font-medium">
              {product_name}
            </p>
            <span className="my-1 text-sm text-neutral-500 dark:text-neutral-300">
              {sku}
            </span>
          </div>
        </div>
      </td>

      <td className="p-4 hidden lg:table-cell">
        <span className="inline-block">
          <SmallQuantityInputNumber 
            defaultValue={currentQuantity}
            minimum_order_quantity={minimum_order_quantity || 1}
            stock_in_hand={stock_in_hand || 0}
            onChange={(qty) => onQuantityChange(sku, qty)}
          />
        </span>
      </td>

      <td className="p-4 hidden lg:table-cell">
        <span className="font-medium">{back_order}</span>
      </td>

      <td className="p-4 hidden lg:table-cell">
        <span className="font-medium">{stock_in_hand}</span>
      </td>

      <td className="p-4 hidden lg:table-cell">
        {currentQuantity > stock_in_hand ? (
          <Badge size="sm" color="warning">
            Back Order
          </Badge>
        ) : (
          <Badge size="sm" color="success">
            In Stock
          </Badge>
        )}
      </td>

      <td className="p-4 hidden lg:table-cell">
        <span className="font-medium">${price}</span>
      </td>

      <td className="p-4 hidden lg:table-cell">
        <span className="font-medium">${(price * currentQuantity).toFixed(2)}</span>
      </td>

      <td className="p-4 hidden lg:table-cell w-40">
        <div className="flex items-center gap-1">
          {hasQuantityChanged && (
            <button
              onClick={() => onUpdate(item, currentQuantity)}
              disabled={isUpdating}
              className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-1"
              type="button"
            >
              <MdSync size={14} className={isUpdating ? "animate-spin" : ""} />
              {isUpdating ? "Updating..." : "Update Qty"}
            </button>
          )}
          <button onClick={() => onDelete(item)} className="flex items-center justify-center w-8 h-8 text-red-600 hover:bg-red-50 rounded transition-colors" type="button">
            <MdDelete size={20} />
          </button>
        </div>
      </td>

      {/* Mobile view */}
      <td className="py-4 p-4 lg:hidden" colSpan={7}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500">Quantity:</span>
            <SmallQuantityInputNumber 
              defaultValue={currentQuantity}
              minimum_order_quantity={minimum_order_quantity || 1}
              stock_in_hand={stock_in_hand || 0}
              onChange={(qty) => onQuantityChange(sku, qty)}
            />
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-neutral-500">Unit Price:</span>
            <span className="font-medium">${price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-neutral-500">Total:</span>
            <span className="font-medium">${(price * currentQuantity).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-neutral-500">Status:</span>
            {currentQuantity > stock_in_hand ? (
              <Badge size="sm" color="warning">
                Back Order
              </Badge>
            ) : (
              <Badge size="sm" color="success">
                In Stock
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-between gap-2 min-h-10">
            {hasQuantityChanged && (
              <button
                onClick={() => onUpdate(item, currentQuantity)}
                disabled={isUpdating}
                className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-1"
                type="button"
              >
                <MdSync size={14} className={isUpdating ? "animate-spin" : ""} />
                {isUpdating ? "Updating..." : "Update Qty"}
              </button>
            )}
            <button onClick={() => onDelete(item)} className="flex items-center justify-center w-8 h-8 text-red-600 hover:bg-red-50 rounded transition-colors" type="button">
              <MdDelete size={20} />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

const CartPage = () => {
  const { nguageStore } = useStore();
  const queryClient = useQueryClient();
  const [searchTerm] = useState("");
  const [changedQuantities, setChangedQuantities] = useState<Record<string, number>>({});
  const [updatingSkus, setUpdatingSkus] = useState<Set<string>>(new Set());
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  // Fetch cart items using React Query
  const { data: cartItems, isLoading, error } = useQuery({
    queryKey: ["cartItems"],
    queryFn: async () => {
      const paginationData = await nguageStore.GetPaginationData({
        table: "cart_items",
        skip: 0,
        take: null,
        NGaugeId: "74",
      });
      const result = Array.isArray(paginationData) ? paginationData : (paginationData?.data || []);
      return result || [];
    },
    staleTime: 0,
    enabled: true,
  });

  // Filter cart items based on search term
  const filteredCart = useMemo(() => {
    const items = Array.isArray(cartItems) ? cartItems : [];
    if (!searchTerm) return items;

    const term = searchTerm.toLowerCase();
    return items.filter(
      (item: any) =>
        item.name.toLowerCase().includes(term) ||
        item.sku.toLowerCase().includes(term),
    );
  }, [cartItems, searchTerm]);

  // Calculate totals
  const cartTotal = (Array.isArray(cartItems) ? cartItems : []).reduce((sum: number, item: any) => {
    return sum + (item.total || item.price * item.quantity);
  }, 0);

  const cartTotalItems = Array.isArray(cartItems) ? cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0) : 0;

  const handleQuantityChange = (sku: string, quantity: number) => {
    setChangedQuantities(prev => ({
      ...prev,
      [sku]: quantity
    }));
  };

  const handleUpdateQuantity = async (item: any, newQuantity: number) => {
    setUpdatingSkus(prev => new Set(prev).add(item.sku));
    try {
      await nguageStore.UpdateRowDataDynamic(
        { ...item, quantity: newQuantity, total: newQuantity * item.price },
        item.ROWID || item.id,
        74,
        "cart_items"
      );
      setChangedQuantities(prev => {
        const updated = { ...prev };
        delete updated[item.sku];
        return updated;
      });
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      toast.success(`Updated ${item.product_name} quantity to ${newQuantity}`);
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    } finally {
      setUpdatingSkus(prev => {
        const updated = new Set(prev);
        updated.delete(item.sku);
        return updated;
      });
    }
  };

  const handleDeleteItem = async (item: any) => {
    try {
      await nguageStore.DeleteRowDataDynamic(
        "cart_items",
        item.ROWID || item.id,
        74,
      );
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      toast.success(<span>Removed <b>${item.product_name}</b> from cart</span>);
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    try {
      if (!Array.isArray(cartItems) || cartItems.length === 0) {
        toast.warning("Your cart is empty");
        return;
      }

      // Calculate order totals
      const totalSkus = cartItems.length;
      const orderQuantity = cartItems.reduce((sum, item: any) => sum + (item.quantity || 0), 0);
      const totalBackOrder = cartItems.reduce((sum, item: any) => sum + (item.back_order || 0), 0);
      const grossValue = cartItems.reduce((sum, item: any) => sum + (item.total || item.price * item.quantity), 0);

      // Generate order numbers (these could be system-generated based on your requirements)
      const timestamp = Date.now();
      const omsOrder = `OMS${timestamp.toString().slice(-5)}`;
      const deliveryCode = Math.floor(Math.random() * 99999999).toString();

      // Create order payload with stringified cart_details
      const orderPayload = {
        oms_order: omsOrder,
        order_date: new Date().toISOString(),
        total_skus: totalSkus,
        order_quantity: orderQuantity,
        total_back_order: totalBackOrder,
        gross_value: grossValue,
        status: "Completed",
        credit_status: "Not Relevant",
        delivery_code: deliveryCode,
        cart_details: JSON.stringify(cartItems),
      };

      // Add order to customer_order_list table
      await nguageStore.AddRowData(orderPayload as any, 75, "customer_order_list");
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["MyOrders"] });
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      
      toast.success(`Order placed successfully! Order ID: ${omsOrder}`);
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to checkout. Please try again.");
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  // Debounced validation (1 second delay)
  // const debouncedValidation = useMemo(
  //   () =>
  //     debounce((sku: string, value: string) => {
  //       const product = cart.find(p => p.sku === sku);
  //       if (!product) return;

  //       const numValue = parseInt(value);
  //       let newQuantity: number;

  //       if (isNaN(numValue) || numValue < product.minimum_order_quantity) {
  //         newQuantity = product.minimum_order_quantity;
  //       } else {
  //         newQuantity = Math.round(
  //           numValue > product.stock_in_hand * 2
  //             ? product.stock_in_hand * 2 / product.minimum_order_quantity
  //             : numValue / product.minimum_order_quantity
  //         ) * product.minimum_order_quantity;
  //       }

  //       // Update both state & input value to match
  //       productStore.handleIncrementOrDecrement(sku, newQuantity);
  //       setInputValues(prev => ({
  //         ...prev,
  //         [sku]: newQuantity.toString()
  //       }));
  //     }, 1000),
  //   [cart]
  // );

  // const handleQuantityChange = (sku: string, e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setInputValues(prev => ({
  //     ...prev,
  //     [sku]: value
  //   }));
  //   debouncedValidation(sku, value);
  // };

  const breadcrumbitems = [
    { title: <ButtonLink href="/">Home</ButtonLink> },
    { title: "Your Shopping Cart" },
  ];

  return (
    <main className="nc-CartPage">
      <div className="container pb-8">
        <Breadcrumbs Items={breadcrumbitems} />

        <div className="pt-4">
          <div className="mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <h2 className="block text-2xl font-semibold">
              Shopping Cart
            </h2>
          </div>

          <div className="mb-7 h-[320px] overflow-y-auto w-full divide-y divide-neutral-300 bg-white dark:bg-neutral-900">
            <table className="table w-full">
              <thead className="sticky top-0 z-10 mb-2 border-b border-neutral-200 bg-brand text-white">
                <tr className="text-left text-sm">
                  <th scope="col" className="w-4/18 p-4">
                    Product
                  </th>
                  <th scope="col" className="hidden w-2/18 p-4 lg:table-cell">
                    Order Quantity
                  </th>
                  <th scope="col" className="hidden w-2/18 p-4 lg:table-cell">
                    Back Order
                  </th>
                  <th scope="col" className="hidden w-2/18 p-4 lg:table-cell">
                    SOH
                  </th>
                  <th scope="col" className="hidden w-2/18 p-4 lg:table-cell">
                    Status
                  </th>
                  <th scope="col" className="hidden w-2/18 p-4 lg:table-cell">
                    Unit Price
                  </th>
                  <th scope="col" className="hidden w-2/18 p-4 lg:table-cell">
                    Total Price
                  </th>
                  <th scope="col" className="hidden w-2/18 p-4 lg:table-cell">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="py-20 text-center">
                      <p className="text-neutral-500">Loading cart items...</p>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={8} className="py-20 text-center">
                      <p className="text-red-500">Error loading cart items</p>
                    </td>
                  </tr>
                ) : filteredCart.length > 0 ? (
                  filteredCart.map((item: any) => renderProduct(
                    item,
                    handleQuantityChange,
                    handleUpdateQuantity,
                    updatingSkus.has(item.sku),
                    changedQuantities,
                    handleDeleteItem
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-20 text-center">
                      <p className="text-neutral-500">Your cart is empty</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="lg:flex lg:justify-end">
            <div className="lg:w-1/4">
              <div className="sticky top-28">
                <div>
                  <div className="flex justify-between gap-2">
                    <span>Subtotal:</span>
                    <span className="font-semibold">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span>Total Quantity:</span>
                    <span className="font-semibold">
                      {cartTotalItems}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span>Total SKUs:</span>
                    <span className="font-semibold">
                      {Array.isArray(cartItems) ? cartItems.length : 0}
                    </span>
                  </div>
                </div>
                <ButtonPrimary 
                  onClick={handleCheckout}
                  disabled={isCheckoutLoading}
                  className="w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCheckoutLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Checking Out...
                    </>
                  ) : (
                    "Checkout"
                  )}
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
