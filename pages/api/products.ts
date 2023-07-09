// @ts-ignore
import clientPromise from "../../lib/mongodb";
import {
  SORT_ORDER_MAP,
  PRODUCT_DATA_TRAITS,
  DEFAULT_CATEGORY,
  DEFAULT_SORT_ORDER,
} from "../../src/constants/products";
import { getErrorMessage } from "../../src/handlers/error";
import type { NextApiRequest, NextApiResponse } from "next";
import { getQueryParam } from "../../src/handlers/requests";
import type { Filter, FindOptions } from "mongodb";

const getFilter = (categoryReq: string): Filter<Document> => {
  return {
    ...(categoryReq !== DEFAULT_CATEGORY
      ? { product_type: categoryReq.replaceAll("_", " ") }
      : {}),
    "variants.available": true,
    tags: { $nin: ["kid", "Kids"] },
    title: { $not: { $regex: "Kids|Gift Card" } },
  };
};

// const getOptions = (): FindOptions<Document> => {
//   return PRODUCT_DATA_TRAITS;
// }
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
    // This needs refinement as the db connections will increase
    const client = await clientPromise;
    const db = client.db("packrat");
    const query = db
      .collection("products")
      // NOTE: this used to be passed in as a second param PRODUCT_DATA_TRAITS but its not working due to TS error
      .find(filter)
      .collation({ locale: "en_US", numericOrdering: true })
      .skip(pageIndex * pageSize)
      .limit(pageSize);

    // NOTE: Sort order borked because it is improperly typed atm
    // if (orderReq) query.sort(SORT_ORDER_MAP.get(orderReq));

    const products = await query.toArray();

    res.json(products);
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(message);
    res.status(500).send({ message });
  }
}
