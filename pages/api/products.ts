// @ts-ignore
import clientPromise from "../../lib/mongodb";
import {
  SORT_ORDER_MAP,
  PRODUCT_DATA_TRAITS,
  DEFAULT_CATEGORY,
  DEFAULT_SORT_ORDER,
} from "../constants/products";
import { getErrorMessage } from "../handlers/error";
import type { NextApiRequest, NextApiResponse } from "next";
import { getQueryParam } from "../handlers/requests";

const getFilter = (categoryReq: string) => {
  return {
    ...(categoryReq !== DEFAULT_CATEGORY
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
  const orderReq: string = getQueryParam(
    DEFAULT_SORT_ORDER,
    req.query.orderReq
  );
  const categoryReq: string = getQueryParam(
    DEFAULT_CATEGORY,
    req.query.categoryReq
  );
  const pageIndex: number = Number(getQueryParam(0, req.query.pageIndex));
  const pageSize = Number(getQueryParam(1, req.query.pageSize));

  const filter = getFilter(categoryReq);

  try {
    // @ts-ignore
    const client = await clientPromise;
    const db = client.db("packrat");
    const query = db
      .collection("products")
      .find(filter, PRODUCT_DATA_TRAITS)
      .collation({ locale: "en_US", numericOrdering: true })
      .skip(pageIndex * pageSize)
      .limit(pageSize);

    if (orderReq) query.sort(SORT_ORDER_MAP.get(orderReq));

    const products = await query.toArray();

    res.json(products);
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(message);
    res.status(500).send({ message });
  }
}
