import { mongodb } from "../../utils/database";
/* 
EXAMPLE API CALL
http://localhost:3000/api/products?orderReq=random&categoryReq=Shop_All&pageIndex=5&pageSize=10
*/
const category = [
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
const productDataTraits = "title variants images vendor tags product_type";

export default async (req, res) => {
  let { orderReq, categoryReq, pageIndex, pageSize } = req.query;
  const sortBy = order.get(orderReq);
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
    const client = await mongodb.clientPromise;
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
};
