import clientPromise from "../../lib/mongodb";
import Product from "../models/products";
import { getFilter, getOptions } from "../helpers/query";
import { SORT_ORDER_MAP } from "../constants/products";

export interface ProductsQueryOptions {
  pageIndex: number | 0;
  pageSize: number | 1;
  orderReq: string;
  categoryReq: string;
}

export const query = async (
  options: ProductsQueryOptions
): Promise<Product[]> => {
  const [sortBy, sortDirection] = SORT_ORDER_MAP[options.orderReq];
  const findFilter = getFilter(options.categoryReq);
  const findOptions = getOptions();

  // NOTE: this pattern will eventually need to be done away with
  // Everytime this query is called we establish a new connection to the database which is bad
  // We want to maintain a steady single connection per API instance
  // see lib/mongodb.alt.ts for possible solution
  const client = await clientPromise;
  const db = client.db("packrat");
  const query = db
    .collection("products")
    .find(findFilter, findOptions)
    .collation({ locale: "en_US", numericOrdering: true })
    .skip(options.pageIndex * options.pageSize)
    .limit(options.pageSize)
    .sort(sortBy, sortDirection);

  const products = (await query.toArray()) as Array<Product>;
  return products;
};
