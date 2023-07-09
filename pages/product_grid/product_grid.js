import ProductCard from './product_card';
import useSWRInfinite from 'swr/infinite';
import { useEffect } from 'react';

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end
  return `/api/products?orderReq=random&categoryReq=Shop_All&pageIndex=${pageIndex}&pageSize=20`; // SWR key
};

export default function ProductGrid({ inView }) {
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);

  useEffect(() => {
    setTimeout(() => {
      setSize(size + 1);
    }, 250);
  }, [inView]);

  if (!data) return 'loading';

  return (
    <div className="  grid grid-cols-4 space-x-1  space-y-5 align-bottom ">
      {data.map((products) => {
        return products.map((product, index) =>
          ProductCard({ ...product }, index * size),
        );
      })}
    </div>
  );
}
