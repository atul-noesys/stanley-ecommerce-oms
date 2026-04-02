"use client";

import Badge from "@/components/badge/Badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import ButtonLink from "@/shared/Button/ButtonLink";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SmallQuantityInputNumber from "@/shared/InputNumber/small-input-counter";
import { useStore } from "@/store/store-context";
import { useQuery } from "@tanstack/react-query";
// import { debounce } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const renderProduct = (item: any) => {
  const { product_name, sku, image, back_order, minimum_order_quantity, price, quantity, stock_in_hand } = item;

  return (
    <tr
      key={product_name}
      className="border-b border-neutral-300 dark:border-neutral-500"
    >
      <td className="py-4 p-4">
        <div className="flex items-center gap-3">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-sm">
            <Image
              fill
              src={image}
              alt={product_name}
              className="size-full object-contain object-center"
            />
            <Link className="absolute inset-0" href={`/products/${sku}`} />
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
            defaultValue={quantity}
            minimum_order_quantity={minimum_order_quantity || 1}
            stock_in_hand={stock_in_hand || 0}
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
        {quantity > stock_in_hand ? (
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
        <span className="font-medium">${(price * quantity).toFixed(2)}</span>
      </td>

      <td className="p-4 hidden lg:table-cell">
        <ButtonLink>Remove</ButtonLink>
      </td>

      {/* Mobile view */}
      <td className="py-4 p-4 lg:hidden" colSpan={7}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500">Quantity:</span>
            <SmallQuantityInputNumber 
              defaultValue={quantity}
              minimum_order_quantity={minimum_order_quantity || 1}
              stock_in_hand={stock_in_hand || 0}
            />
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-neutral-500">Unit Price:</span>
            <span className="font-medium">${price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-neutral-500">Total:</span>
            <span className="font-medium">${(price * quantity).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-neutral-500">Status:</span>
            {quantity > stock_in_hand ? (
              <Badge size="sm" color="warning">
                Back Order
              </Badge>
            ) : (
              <Badge size="sm" color="success">
                In Stock
              </Badge>
            )}
          </div>
          <div className="text-right">
            <ButtonLink>Remove</ButtonLink>
          </div>
        </div>
      </td>
    </tr>
  );
};

const CartPage = () => {
  const { nguageStore } = useStore();
  const [searchTerm] = useState("");

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
      <div className="container pb-8 lg:pb-24">
        <Breadcrumbs Items={breadcrumbitems} />

        <div className="pt-4">
          <div className="mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <h2 className="block text-2xl font-semibold sm:text-3xl">
              Shopping Cart
            </h2>
          </div>

          <div className="mb-8 h-[320px] overflow-y-auto w-full divide-y divide-neutral-300 bg-white dark:bg-neutral-900">
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
                    <td colSpan={8} className="py-10 text-center">
                      <p className="text-neutral-500">Loading cart items...</p>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={8} className="py-10 text-center">
                      <p className="text-red-500">Error loading cart items</p>
                    </td>
                  </tr>
                ) : filteredCart.length > 0 ? (
                  filteredCart.map((item: any) => renderProduct(item))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-10 text-center">
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
                    <span>Totol SKUs:</span>
                    <span className="font-semibold">
                      {Array.isArray(cartItems) ? cartItems.length : 0}
                    </span>
                  </div>
                </div>
                <ButtonPrimary href="/checkout" className="w-full mt-4">
                  Checkout
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
