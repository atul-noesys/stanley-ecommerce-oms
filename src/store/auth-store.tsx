// stores/auth-store.ts (Fixed)
import { makeAutoObservable, runInAction } from "mobx";
import { ToastStore } from "./toast-store";

interface SignInData {
  username: string;
  password: string;
}

interface SignInResponse {
  data: {
    data: {
      access_token: string;
      expires_in: number;
    };
  };
  message?: string;
}

export class AuthStore {
  isAuthenticated = false;
  isLoading = false;
  error: string | null = null;

  constructor(private toastStore: ToastStore) {
    makeAutoObservable(this);

    // Only check auth status on client side
    if (typeof window !== "undefined") {
    }
  }

  //   private checkAuthStatus() {
  //     try {
  //       const token = localStorage.getItem('access_token');
  //       const expiry = localStorage.getItem('token_expiry');

  //       if (token && expiry) {
  //         const expiryTime = parseInt(expiry);
  //         const currentTime = Math.floor(Date.now() / 1000);

  //         if (currentTime < expiryTime) {
  //           runInAction(() => {
  //             this.isAuthenticated = true;
  //           });
  //         } else {
  //           this.logout();
  //         }
  //       }
  //     } catch (error) {
  //       console.warn('Could not access localStorage:', error);
  //     }
  //   }

  async login(data: SignInData) {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

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
        localStorage.setItem(
          "token_expiry",
          result.data.data.expires_in.toString(),
        );
      }

      runInAction(() => {
        this.isAuthenticated = true;
        this.isLoading = false;
      });

      this.toastStore.success("Login successful!");
      return true;
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        this.isLoading = false;
      });

      this.toastStore.error("Ops! Something went wrong, Login Failed");
      return false;
    }
  }

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_expiry");
    }

    runInAction(() => {
      this.isAuthenticated = false;
      this.error = null;
    });

    this.toastStore.info("Logged out successfully");
  }

  getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token");
    }
    return null;
  }

  isTokenValid(): boolean {
    if (typeof window !== "undefined") {
      const expiry = localStorage.getItem("token_expiry");
      if (!expiry) return false;

      const expiryTime = parseInt(expiry);
      const currentTime = Math.floor(Date.now() / 1000);

      return currentTime < expiryTime;
    }
    return false;
  }
}
