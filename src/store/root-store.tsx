import { ProductStore } from "./product-store";

export class RootStore {
  productStore: ProductStore;

  constructor() {
    this.productStore = new ProductStore();
  }
}

export const rootStore = new RootStore();
