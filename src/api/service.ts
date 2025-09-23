import {
  NguageCategory,
  NguageCategoryMapping,
  NguageFeatures,
  NguageProduct,
  NguageProductImageMapping,
  NguageProductImages,
} from "@/types/ngauge-product";

const NGUAGE_API_URL =
  "https://nooms.infoveave.app/api/v10/ngauge/forms/26/get-data";
const NGUAGE_API_FEATURE_URL =
  "https://nooms.infoveave.app/api/v10/ngauge/forms/19/get-data";
const NGUAGE_API_CATEGORY_URL =
  "https://nooms.infoveave.app/api/v10/ngauge/forms/18/get-data";
const NGUAGE_API_CATEGORY_MAPPING_URL =
  "https://nooms.infoveave.app/api/v10/ngauge/forms/28/get-data";
const NGUAGE_API_PRODUCT_IMAGES_URL =
  "https://nooms.infoveave.app/api/v10/ngauge/forms/20/get-data";
const NGUAGE_API_PRODUCT_IMAGE_MAPPING_URL =
  "https://nooms.infoveave.app/api/v10/ngauge/forms/29/get-data";

export async function fetchNguageProducts(token: string | null) {
  const body = {
    table: "oms_product",
    skip: 0,
    take: 200,
    NGaugeId: "26",
  };

  const response = await fetch(NGUAGE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch NGauge products: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data as NguageProduct[];
}

export async function fetchNguageProductsFeatures(token: string | null) {
  const body = {
    table: "oms_productfeature",
    skip: 0,
    take: 1000,
    NGaugeId: "19",
  };

  const response = await fetch(NGUAGE_API_FEATURE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch NGauge products: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data as NguageFeatures[];
}

export async function fetchNguageProductsCategory(token: string | null) {
  const body = {
    table: "oms_productcategory",
    skip: 0,
    take: 1000,
    NGaugeId: "18",
  };

  const response = await fetch(NGUAGE_API_CATEGORY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch NGauge Category: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data as NguageCategory[];
}

export async function fetchNguageProductsCategoryMapping(token: string | null) {
  const body = {
    table: "oms_productcatmapping",
    skip: 0,
    take: 1000,
    NGaugeId: "28",
  };

  const response = await fetch(NGUAGE_API_CATEGORY_MAPPING_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch NGauge Category: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data as NguageCategoryMapping[];
}

export async function fetchNguageProductsImages(token: string | null) {
  const body = {
    table: "oms_productimage",
    skip: 0,
    take: 1000,
    NGaugeId: "20",
  };

  const response = await fetch(NGUAGE_API_PRODUCT_IMAGES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch NGauge Image Mapping Data: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.data as NguageProductImages[];
}

export async function fetchNguageProductsImageMapping(token: string | null) {
  const body = {
    table: "oms_prodimagemapping",
    skip: 0,
    take: 1000,
    NGaugeId: "29",
  };

  const response = await fetch(NGUAGE_API_PRODUCT_IMAGE_MAPPING_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch NGauge Image Mapping Data: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.data as NguageProductImageMapping[];
}
