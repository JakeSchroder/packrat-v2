import ProductCard from './product_card';
import useSWRInfinite from 'swr/infinite';
import { useEffect } from 'react';
import SkeletonCard from './skeleton_card';

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

  if (!data)
    return (
      <div className="  grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 space-x-1  space-y-5 align-bottom justify-items-center">
        {Array.apply(null, { length: 24 }).map((e, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );

  return (
    <div className="  grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 space-x-1  space-y-5 align-bottom justify-items-center">
      {data.map((products) => {
        return products.map((product, index) =>
          ProductCard({ ...product }, index * size),
        );
      })}
    </div>
  );
}
