export interface ItemMaster {
  item_code: string;
  item_name: string;
  item_description: string;
  short_description: string;
  long_description: string;
  unit_price: number;
  item_category: string;
  sub_category: string;
  ROWID: number;
  InfoveaveBatchId?: number;
}

export interface ProductMaster {
  item_code: string;
  brand: string;
  orginal_price: number;
  sales_price: number;
  stock_in_hand: number;
  minimum_order_quanity: number;
  package_quantity: number;
  is_excess: boolean;
  is_obsolete: boolean;
  estimated_delivery_days: number;
  additional_info: string;
  usage_policy: string;
  usage_description: string;
  created_by: string;
  updated_by: string;
  created_date: string;
  updated_date: string;
  features: string;
}
