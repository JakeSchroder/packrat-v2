export const FILTER_CATEGORY = [
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

export const SORT_ORDER = new Map([
  ["low_to_high", { "variants.price": 1 }],
  ["high_to_low", { "variants.price": -1 }],
  ["old_to_new", { updated_at: 1 }],
  ["new_to_old", { updated_at: -1 }],
  ["random", { random_sort: 1 }],
]);

//   NOTE: this needs a better name
export const PRODUCT_DATA_TRAITS = [
  "title",
  "variants",
  "images",
  "vendor",
  "tags",
  "product_type",
].join(" ");
