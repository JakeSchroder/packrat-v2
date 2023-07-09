// @ts-ignore
import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
/* 
EXAMPLE API CALL
http://localhost:3000/api/products?orderReq=random&categoryReq=Shop_All&pageIndex=5&pageSize=10
*/
const category: Array<string> = [
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
const order = new Map([
  ["low_to_high", { "variants.price": 1 }],
  ["high_to_low", { "variants.price": -1 }],
  ["old_to_new", { updated_at: 1 }],
  ["new_to_old", { updated_at: -1 }],
  ["random", { random_sort: 1 }],
]);
const productDataTraits: string =
  "title handle variants images vendor tags product_type url";

export interface ProductsPageQueryParams {
  orderReq: string;
  categoryReq: string;
  pageIndex: number;
  pageSize: number;
}

export default async function getProducts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const orderReq = Array.isArray(req.query.orderReq) ? "" : req.query.orderReq;
  const categoryReq = Array.isArray(req.query.categoryReq)
    ? ""
    : req.query.categoryReq;
  const pageIndex = Array.isArray(req.query.pageIndex)
    ? 0
    : Number(req.query.pageIndex);
  const pageSize = Array.isArray(req.query.pageSize)
    ? 20
    : Number(req.query.pageSize);

  if (!orderReq || !categoryReq) {
    throw new Error("Missing required query parameter");
  }

  const sortBy = order.get(orderReq);
  const filter =
    categoryReq !== "Shop_All"
      ? {
          product_type: categoryReq.replaceAll("_", " "),
          "variants.available": true,
          tags: { $nin: ["kid", "Kids"] },
          title: { $not: { $regex: "Kids|Gift Card" } },
        }
      : {
          "variants.available": true,
          tags: { $nin: ["kid", "Kids"] },
          title: { $not: { $regex: "Kids|Gift Card" } },
        };

  try {
    // @ts-ignore
    const client = await clientPromise;
    const db = client.db("packrat");

    const products = await db
      .collection("products")
      .find(filter, productDataTraits)
      .sort(sortBy)
      .collation({ locale: "en_US", numericOrdering: true })
      .skip(pageIndex * pageSize)
      .limit(Number(pageSize))
      .toArray();

    res.json(products);
  } catch (e) {
    console.error(e);
  }
}
