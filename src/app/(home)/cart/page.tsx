"use client";

import Badge from "@/components/badge/Badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import ButtonLink from "@/shared/Button/ButtonLink";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import InputNumber from "@/shared/InputNumber/InputNumber";
import { Cart } from "@/store/product-store";
import { useStore } from "@/store/store-context";
// import { debounce } from "lodash";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const renderProduct = (item: Cart) => {
  const { name, sku, image, backOrder, moq, price, quantity, soh } = item;

  return (
    <tr
      key={name}
      className="border-b border-neutral-300 dark:border-neutral-500"
    >
      <td className="py-4 md:flex md:justify-between">
        <div className="flex items-center gap-3 pl-6">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-sm">
            <Image
              fill
              src={image}
              alt={name}
              className="size-full object-contain object-center"
            />
            <Link className="absolute inset-0" href={`/products/${sku}`} />
          </div>
          <div className="leading-tight">
            <p className="font-medium">
              <Link href={`/products/${sku}`}>{name}</Link>
            </p>
            <span className="my-1 text-sm text-neutral-500 dark:text-neutral-300">
              {sku} {moq}
            </span>
          </div>
        </div>
        <div className="block items-center gap-4 px-6 pt-3 md:flex lg:hidden">
          <div className="flex items-center justify-end gap-6">
            <div className="space-x-4">
              <span className="font-medium">${price}</span>
            </div>
            <InputNumber />
          </div>
          <div>
            <ButtonLink>Remove</ButtonLink>
          </div>
        </div>
      </td>

      <td className="hidden lg:table-cell">
        <span className=" inline-block">
          <InputNumber />
        </span>
      </td>
      <td className="hidden lg:table-cell">
        <span className="font-medium">{backOrder}</span>
      </td>

      <td className="hidden lg:table-cell">
        <span className="font-medium">{soh}</span>
      </td>

      <td className="hidden lg:table-cell">
        {quantity > soh ? (
          <Badge size="sm" color="warning">
            Back Order
          </Badge>
        ) : (
          <Badge size="sm" color="success">
            In Stock
          </Badge>
        )}
      </td>

      <td className="hidden lg:table-cell">
        <span className="font-medium">${price}</span>
      </td>

      <td className="hidden lg:table-cell">
        <span className="font-medium">${(price * quantity).toFixed(2)}</span>
      </td>

      <td className="hidden lg:table-cell">
        <ButtonLink>Remove</ButtonLink>
      </td>
    </tr>
  );
};

const CartPage = observer(() => {
  const { productStore } = useStore();

  const [searchTerm] = useState("");
  const [cart] = useState(productStore.cart);
  // const [, setInputValues] = useState<Record<string, string>>(
  //   Object.fromEntries(productStore.cart.map(item => [item.sku, item.quantity.toString()]))
  // );

  // Filter cart items based on search term
  const filteredCart = useMemo(() => {
    if (!searchTerm) return cart;

    const term = searchTerm.toLowerCase();
    return cart.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.sku.toLowerCase().includes(term),
    );
  }, [cart, searchTerm]);

  // Debounced validation (1 second delay)
  // const debouncedValidation = useMemo(
  //   () =>
  //     debounce((sku: string, value: string) => {
  //       const product = cart.find(p => p.sku === sku);
  //       if (!product) return;

  //       const numValue = parseInt(value);
  //       let newQuantity: number;

  //       if (isNaN(numValue) || numValue < product.moq) {
  //         newQuantity = product.moq;
  //       } else {
  //         newQuantity = Math.round(
  //           numValue > product.soh * 2
  //             ? product.soh * 2 / product.moq
  //             : numValue / product.moq
  //         ) * product.moq;
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

          <div className="mb-8 max-h-[320px] overflow-y-auto w-full divide-y divide-neutral-300 bg-white dark:bg-neutral-900">
            <table className="table w-full">
              <thead className="sticky top-0 z-10 mb-2 border-b border-neutral-200 bg-black text-brand">
                <tr className="text-left text-sm text-brand">
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
                {filteredCart.map((item) => renderProduct(item))}
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
                      ${productStore.CartTotal}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span>Total Quantity:</span>
                    <span className="font-semibold">
                      {productStore.CartTotalItems}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span>Totol SKUs:</span>
                    <span className="font-semibold">
                      {productStore.cart.length}
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
});

export default CartPage;
