"use client";

import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import FormItem from "@/shared/FormItem";
import Input from "@/shared/Input/Input";
import { useStore } from "@/store/store-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface SignInResponse {
  data: {
    data: {
      access_token: string;
      expires_in: number;
    };
  };
  message?: string;
}

const LoginForm = () => {
  const { nguageStore } = useStore();
  const [data, setData] = useState({
    username: "atul",
    password: "sNQR4eY6y*c2",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch("/api/SignIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result: SignInResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Sign in failed");
      }

      // Only access localStorage on client side
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", result.data.data.access_token);
      }

      const user = await nguageStore.GetCurrentUser();

      if (result && (user?.roleId === 8 || user?.roleId === 7)) {
        router.push("/");
      } else if (result) {
        localStorage.clear();
        router.push(
          `https://supplier-and-distributor-portal.netlify.app/#token=${result.data.data.access_token}`
        );
      }
    } catch (error) {
      console.error("Sign in error:", error);
      // You might want to add error handling UI here
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full">
      <h2 className="text-3xl font-semibold my-2">Login</h2>
      <div className="">
        <div className="space-y-6">
          <form action="" onSubmit={handleFormSubmit}>
            <div className="grid gap-2">
              <FormItem>
                <label className="text-gray-600">username</label>
                <Input
                  type="text"
                  name="username"
                  rounded="rounded-sm"
                  value={data.username}
                  onChange={handleInputChange}
                  sizeClass="h-12 px-4 py-3"
                  placeholder="example@example.com"
                  className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary dark:placeholder:text-neutral-300 dark:focus:border-neutral-500"
                />
              </FormItem>
              <FormItem>
                <label className="text-gray-600">password</label>
                <Input
                  type="password"
                  name="password"
                  rounded="rounded-sm"
                  value={data.password}
                  onChange={handleInputChange}
                  sizeClass="h-12 px-4 py-3"
                  placeholder="password"
                  className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary dark:placeholder:text-neutral-300 dark:focus:border-neutral-500"
                />
              </FormItem>
            </div>
            <div className="mt-8 gap-2 space-y-2 lg:flex lg:space-y-0">
              <ButtonPrimary
                showPointer
                type="submit"
                className="w-full"
                disabled={loading}
              >
                <span className="flex items-center justify-center gap-2">
                  {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
                  {loading ? "Logging in..." : "Log In"}
                </span>
              </ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
