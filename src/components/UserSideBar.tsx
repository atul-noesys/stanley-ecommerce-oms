"use client";

import { Dialog, Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment, useMemo, useState } from "react";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/navigation";

import ButtonCircle3 from "@/shared/Button/ButtonCircle3";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { RiUser6Line } from "react-icons/ri";
import { useStore } from "@/store/store-context";

export interface CartSideBarProps { }

const UserSideBar: React.FC<CartSideBarProps> = () => {
  const [isVisable, setIsVisable] = useState(false);
  const { nguageStore } = useStore();
  const router = useRouter();

  // Get user from cached store data
  const user = useMemo(() => nguageStore.GetCurrentUserDetails(), [nguageStore]);

  const handleOpenMenu = () => setIsVisable(true);
  const handleCloseMenu = () => setIsVisable(false);

  const handleLogout = () => {
    localStorage.clear();
    handleCloseMenu();
    router.push("/login");
  };

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
                    <div className="mt-6 flex justify-center flex-col items-center min-h-32 border border-red-500">
                      <Image
                        width={100}
                        height={100}
                        className={`${user?.roleId === 8 ? "w-52" : "w-40 h-full"}`}
                        src={user?.roleId === 8 ? "/toys_rx_logo.png" : "/allen_toys_logo.png"}
                        alt="User"
                      />
                      <p className="font-bold text-xl text-blue-700 py-4">
                        {user?.firstName} {user?.lastName}
                      </p>
                    </div>
                    <div
                      className={`mx-auto w-full p-5 text-left dark:bg-white/[0.03] min-h-52`}
                    >
                      <h3 className="mb-2 font-bold text-gray-900 dark:text-white">
                        Customer Data
                      </h3>
                      <div className="mb-2 text-gray-800 text-theme-sm dark:text-gray-400 flex justify-between">
                        <p className="font-semibold text-gray-500">
                          Username
                        </p>
                        <p>{user?.userName}</p>
                      </div>
                      <div className="mb-2 text-gray-800 text-theme-sm dark:text-gray-400 flex justify-between">
                        <p className="font-semibold text-gray-500">Name</p>
                        <p>{user?.firstName} {user?.lastName}</p>
                      </div>
                      <div className="mb-2 text-gray-800 text-theme-sm dark:text-gray-400 flex justify-between">
                        <p className="font-semibold text-gray-500">Role Name</p>
                        <p>{user?.roleId === 8 ? "Buyer" : "Seller"}</p>
                      </div>
                      <div className="mb-2 text-gray-800 text-theme-sm dark:text-gray-400 flex justify-between">
                        <p className="font-semibold text-gray-500">Role Id</p>
                        <p>{user?.roleId}</p>
                      </div>
                    </div>
                    {/* Fixed Footer */}
                    <div className="w-full p-5">
                      <div className="mt-44 flex flex-col items-center gap-4">
                        {/* <ButtonSecondary
                          onClick={handleCloseMenu}
                          href="/"
                          className="w-full text-center"
                        >
                          Change Customer
                        </ButtonSecondary> */}
                        <ButtonPrimary
                          onClick={handleLogout}
                          className="w-full"
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
