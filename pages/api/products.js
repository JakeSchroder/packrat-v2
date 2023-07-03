import { mongodb } from "@/utils/database";
import {
  FILTER_CATEGORY,
  SORT_ORDER,
  PRODUCT_DATA_TRAITS,
} from "@/utils/constants/products";
/* 
EXAMPLE API CALL
http://localhost:3000/api/products?orderReq=random&categoryReq=Shop_All&pageIndex=5&pageSize=10
*/

export default async (req, res) => {
  let { orderReq, categoryReq, pageIndex, pageSize } = req.query;
  const sortBy = SORT_ORDER.get(orderReq);
  const filter =
    categoryReq !== "Shop_All"
      ? {
          product_type: categoryReq.replaceAll("_", " "),
          "variants.available": true,
          tags: { $nin: ["kid", "Kids"] },
          title: { $not: { $regex: "Kids" }, $not: { $regex: "Gift Card" } },
        }
      : {
          "variants.available": true,
          tags: { $nin: ["kid", "Kids"] },
          title: { $not: { $regex: "Kids" }, $not: { $regex: "Gift Card" } },
        };

  try {
    const client = mongodb.clientPromise;
    const db = client.db("packrat");

    const products = await db
      .collection("products")
      .find(filter, PRODUCT_DATA_TRAITS)
      .sort(sortBy)
      .collation({ locale: "en_US", numericOrdering: true })
      .skip(pageIndex * pageSize)
      .limit(Number(pageSize))
      .toArray();

    res.json(products);
  } catch (e) {
    console.error(e);
  }
};
