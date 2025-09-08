"use client";

import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { MdClose } from "react-icons/md";

import ButtonCircle3 from "@/shared/Button/ButtonCircle3";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import InputNumber from "@/shared/InputNumber/InputNumber";
import { Cart } from "@/store/product-store";
import { useStore } from "@/store/store-context";

export interface CartSideBarProps {}

const CartSideBar: React.FC<CartSideBarProps> = () => {
  const { productStore } = useStore();
  const [isVisable, setIsVisable] = useState(false);

  const handleOpenMenu = () => setIsVisable(true);
  const handleCloseMenu = () => setIsVisable(false);

  const renderProduct = (item: Cart) => {
    const { name, image, price, sku, quantity } = item;

    return (
      <div key={name} className="flex gap-2 py-5 last:pb-0">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
          <Image
            fill
            src={image}
            alt={name}
            className="size-full object-contain object-center"
          />
          <Link
            onClick={handleCloseMenu}
            className="absolute inset-0"
            href={`/products/${sku}`}
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col gap-1">
          <div className="flex items-center justify-between gap-1">
            <div>
              <h3 className="line-clamp-2 text-ellipsis font-medium">
                <Link onClick={handleCloseMenu} href={`/products/${sku}`}>
                  {name}
                </Link>
              </h3>
            </div>
            <div>
              <InputNumber className="h-10" defaultValue={quantity} />
            </div>
          </div>
          <div className="flex w-full items-end justify-between text-sm">
            <div>
              <span className="text-blue-700">
                ${(price * quantity).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-3 text-red-600">Remove</div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <Transition appear show={isVisable} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={handleCloseMenu}
        >
          <div className="z-max fixed inset-y-5 right-5 w-full max-w-md outline-none focus:outline-none md:max-w-[486px]">
            <Transition.Child
              as={Fragment}
              enter="transition duration-100 transform"
              enterFrom="opacity-0 translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="transition duration-150 transform"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-full"
            >
              <div className="relative z-20 h-full">
                <div className="h-full overflow-hidden shadow-lg ring-1 ring-black/5">
                  <div className="relative flex h-full flex-col rounded-md bg-white dark:bg-gray">
                    {/* Header */}
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-4xl font-semibold">
                          Cart{" "}
                          <span className="text-sm font-normal">
                            {productStore.CartTotalItems} items
                          </span>
                        </h3>
                        <ButtonCircle3 onClick={handleCloseMenu}>
                          <MdClose className="text-2xl" />
                        </ButtonCircle3>
                      </div>
                    </div>

                    {/* Scrollable Product List */}
                    <div className="flex-1 overflow-y-auto px-5">
                      <div className="divide-y divide-neutral-300">
                        {productStore.cart.map((item) => renderProduct(item))}
                      </div>
                    </div>

                    {/* Fixed Footer */}
                    <div className="w-full p-5">
                      <div className="bg-neutral-100 p-6 dark:bg-neutral-800">
                        <span className="flex justify-between font-medium">
                          <span className="">Subtotal</span>
                          <span className="">${productStore.CartTotal}</span>
                        </span>
                        <p className="block w-2/3 text-sm text-neutral-500">
                          Tax included and Shipping and taxes calculated at
                          checkout.
                        </p>
                      </div>
                      <div className="mt-5 flex flex-col items-center gap-4">
                        <ButtonPrimary
                          onClick={handleCloseMenu}
                          className="w-full"
                          href="/checkout"
                        >
                          Checkout
                        </ButtonPrimary>
                        <ButtonSecondary
                          onClick={handleCloseMenu}
                          href="/cart"
                          className="w-fit text-center"
                        >
                          View cart
                        </ButtonSecondary>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-neutral-900/60" />
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenMenu}
        className="relative mx-5 xl:mt-3 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        <span className="absolute -top-1/3 left-3/4 inline-block aspect-square size-4 rounded-full px-1 bg-primary text-[10px] text-white">
          {productStore.CartTotalItems > 100
            ? "99+"
            : productStore.CartTotalItems}
        </span>
        <CiShoppingCart size={25} />
      </button>

      {renderContent()}
    </>
  );
};

export default CartSideBar;
