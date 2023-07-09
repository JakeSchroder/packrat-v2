import {
  DEFAULT_CATEGORY,
  DEFAULT_SORT_ORDER,
} from '../../src/constants/products';
import { getErrorMessage } from '../../src/handlers/error';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getQueryParam } from '../../src/handlers/requests';
import Product from '../../src/models/products';
import { query, ProductsQueryOptions } from '../../src/database/getProducts';

/* 
EXAMPLE API CALL
http://localhost:3000/api/products?orderReq=random&categoryReq=Shop_All&pageIndex=5&pageSize=10
*/
export default async function getProducts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const options: ProductsQueryOptions = {
    orderReq: getQueryParam(DEFAULT_SORT_ORDER, req.query.orderReq),
    categoryReq: getQueryParam(DEFAULT_CATEGORY, req.query.categoryReq),
    pageIndex: Number(getQueryParam(0, req.query.pageIndex)),
    pageSize: Number(getQueryParam(1, req.query.pageSize)),
  };
  try {
    const products: Product[] = await query(options);
    res.json(products);
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(message);
    res.status(500).send({ message });
  }
}
