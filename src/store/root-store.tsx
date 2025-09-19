import { ProductStore } from "./product-store";
import { ToastStore } from "./toast-store";

export class RootStore {
  productStore: ProductStore;
  toastStore: ToastStore;

  constructor() {
    this.productStore = new ProductStore(this);
    this.toastStore = new ToastStore();
  }
}

export const rootStore = new RootStore();
