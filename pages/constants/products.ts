export const CATEGORIES: Array<string> = [
  "Shop_All",
  "T-Shirts",
  "Tops",
  "Layers",
  "Pullovers",
  "Shorts",
  "Pants",
  "Dresses_&_Skirts",
  "Shoes",
  "Jewelry",
  "Accessories",
  "Wildcard_Clothing",
  "Goods",
];
export const SORT_ORDER_MAP = new Map([
  ["low_to_high", { "variants.price": 1 }],
  ["high_to_low", { "variants.price": -1 }],
  ["old_to_new", { updated_at: 1 }],
  ["new_to_old", { updated_at: -1 }],
  ["random", { random_sort: 1 }],
]);
export const PRODUCT_DATA_TRAITS: string = [
  "title",
  "handle",
  "variants",
  "images",
  "vendor",
  "tags",
  "product_type",
  "url",
].join(" ");
