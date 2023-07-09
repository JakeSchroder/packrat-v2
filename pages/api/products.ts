// @ts-ignore
import clientPromise from "../../lib/mongodb";
import { SORT_ORDER_MAP, PRODUCT_DATA_TRAITS } from "../constants/products";
import { getErrorMessage } from "../handlers/error";
import type { NextApiRequest, NextApiResponse } from "next";

const getFilter = (categoryReq: string) => {
  return {
    ...(categoryReq !== "Shop_All"
      ? { product_type: categoryReq.replaceAll("_", " ") }
      : {}),
    "variants.available": true,
    tags: { $nin: ["kid", "Kids"] },
    title: { $not: { $regex: "Kids|Gift Card" } },
  };
};

/* 
EXAMPLE API CALL
http://localhost:3000/api/products?orderReq=random&categoryReq=Shop_All&pageIndex=5&pageSize=10
*/
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

  const sortBy = SORT_ORDER_MAP.get(orderReq);
  const filter = getFilter(categoryReq);

  try {
    // @ts-ignore
    const client = await clientPromise;
    const db = client.db("packrat");

    const products = await db
      .collection("products")
      .find(filter, PRODUCT_DATA_TRAITS)
      .sort(sortBy)
      .collation({ locale: "en_US", numericOrdering: true })
      .skip(pageIndex * pageSize)
      .limit(pageSize)
      .toArray();

    res.json(products);
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(message);
    res.status(500).send({ message });
  }
}
