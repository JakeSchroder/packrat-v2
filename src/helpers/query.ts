import {
  SORT_ORDER_MAP,
  PRODUCT_DATA_TRAITS,
  DEFAULT_CATEGORY,
  DEFAULT_SORT_ORDER,
} from "../constants/products";
import type { Filter, FindOptions } from "mongodb";
import Product from "../models/products";

export const getFilter = (categoryReq: string): Filter<Document> => {
  return {
    ...(categoryReq !== DEFAULT_CATEGORY
      ? { product_type: categoryReq.replaceAll("_", " ") }
      : {}),
    "variants.available": true,
    tags: { $nin: ["kid", "Kids"] },
    title: { $not: { $regex: "Kids|Gift Card" } },
  };
};

interface ProductOptions {
  [key: string]: boolean;
}

export const getOptions = (): FindOptions<Document> => {
  const projection: ProductOptions = {};
  PRODUCT_DATA_TRAITS.forEach((key: string) => (projection[key] = true));
  return { projection };
};
