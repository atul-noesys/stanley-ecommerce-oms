"use client";

import { Dialog, Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import { MdClose } from "react-icons/md";

import ButtonCircle3 from "@/shared/Button/ButtonCircle3";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { RiUser6Line } from "react-icons/ri";

export interface CartSideBarProps {}

const UserSideBar: React.FC<CartSideBarProps> = () => {
  const [isVisable, setIsVisable] = useState(false);

  const handleOpenMenu = () => setIsVisable(true);
  const handleCloseMenu = () => setIsVisable(false);

  const renderContent = () => {
    return (
      <Transition appear show={isVisable} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={handleCloseMenu}
        >
          <div className="z-max fixed inset-y-0 right-0 w-full max-w-md outline-none focus:outline-none md:max-w-[400px]">
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
                  <div className="relative flex h-full flex-col bg-white dark:bg-gray">
                    {/* Header */}
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-4xl font-semibold"></h3>
                        <ButtonCircle3 onClick={handleCloseMenu}>
                          <MdClose className="text-2xl" />
                        </ButtonCircle3>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-center flex-col items-center">
                      <span className="mr-3 overflow-hidden rounded-full h-24 w-24">
                        <Image
                          width={100}
                          height={100}
                          src="/user/sample.png"
                          alt="User"
                        />
                      </span>
                      <p className="font-bold text-xl text-blue-700 py-4">
                        Sanjay Raja
                      </p>
                    </div>
                    <div
                      className={`mx-auto w-full p-5 text-left dark:bg-white/[0.03]`}
                    >
                      <h3 className="mb-2 font-bold text-gray-900 dark:text-white">
                        Customer Data
                      </h3>
                      <div className="mb-2 text-gray-800 text-theme-sm dark:text-gray-400 flex justify-between">
                        <p className="font-semibold text-gray-500">Code</p>
                        <p>0001305431</p>
                      </div>
                      <div className="mb-2 text-gray-800 text-theme-sm dark:text-gray-400 flex justify-between">
                        <p className="font-semibold text-gray-500">Name</p>
                        <p>Sanjay Raja</p>
                      </div>
                      <div className="mb-2 text-gray-800 text-theme-sm dark:text-gray-400 flex justify-between">
                        <p className="font-semibold text-gray-500">Contact</p>
                        <p>+91-7878562323</p>
                      </div>
                      <div className="mb-2 text-gray-800 text-theme-sm dark:text-gray-400 flex justify-between">
                        <p className="font-semibold text-gray-500">
                          Credit Limit
                        </p>
                        <p>$12,100</p>
                      </div>
                      <div className="mb-2 text-gray-800 text-theme-sm dark:text-gray-400 flex justify-between">
                        <p className="font-semibold text-gray-500">
                          Available Limit
                        </p>
                        <p>$0</p>
                      </div>
                      <div className="mb-2 text-gray-800 text-theme-sm dark:text-gray-400 flex justify-between">
                        <p className="font-semibold text-gray-500">Overdue</p>
                        <p>$0</p>
                      </div>
                    </div>
                    {/* Fixed Footer */}
                    <div className="w-full p-5">
                      <div className="mt-5 flex flex-col items-center gap-4">
                        <ButtonSecondary
                          onClick={handleCloseMenu}
                          href="/"
                          className="w-full text-center"
                        >
                          Change Customer
                        </ButtonSecondary>
                        <ButtonPrimary
                          onClick={handleCloseMenu}
                          className="w-full"
                          href="/login"
                        >
                          Logout
                        </ButtonPrimary>
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
      <Menu as="div" className="relative inline-block">
        <Menu.Button
          className="flex items-center gap-1 text-sm bg-white p-2 rounded-full"
          onClick={handleOpenMenu}
        >
          <span className="flex items-center justify-center">
            <RiUser6Line className="" size={20} />
          </span>
        </Menu.Button>
      </Menu>

      {renderContent()}
    </>
  );
};

export default UserSideBar;
