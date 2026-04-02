import { NguageStore } from "./nguage-store";
import { ProductStore } from "./product-store";

export class RootStore {
  productStore: ProductStore;
  nguageStore: NguageStore;

  constructor() {
    this.productStore = new ProductStore();
    this.nguageStore = new NguageStore();
  }
}

export const rootStore = new RootStore();
