import { AuthStore } from './auth-store';
import { ProductStore } from './product-store';
import { ToastStore } from './toast-store';

export class RootStore {
  productStore: ProductStore;
  toastStore: ToastStore;
  authStore: AuthStore;

  constructor() {
    this.productStore = new ProductStore(this);
    this.toastStore = new ToastStore();
    this.authStore = new AuthStore(this.toastStore);
  }
}

export const rootStore = new RootStore();