export interface NguageProduct {
  product_id: string;
  sku: string;
  brand: string;
  is_excess: string;
  is_obsolete: string;
  name: string;
  description: string;
  original_price: number;
  sales_price: number;
  estimated_delivery_date: string;
  package_quantity: number;
  image_id: number;
  stock_in_hand: number;
  minimum_order_quantity: number;
  created_by: string;
  updated_by: string;
  created_date: string;
  updated_date: string;
  InfoveaveBatchId: number;
  short_description: null | string;
  long_description: null | string;
  additional_info: null | string;
  usage_policy: null | string;
  usage_description: null | string;
  tags?: "Promotions" | "New Products" | "Focus Products";
  ROWID: number;
}
