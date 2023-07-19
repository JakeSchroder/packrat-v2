import ProductCard from './product_card';
import useSWRInfinite from 'swr/infinite';
import { useEffect } from 'react';
import SkeletonCard from './skeleton_card';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ProductGrid({ inView, categoryFilter, orderSort }) {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `/api/products?orderReq=${orderSort}&categoryReq=${categoryFilter}&pageIndex=${pageIndex}&pageSize=20`; // SWR key
  };
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);
  const gridClassName =
    'grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 space-x-1 space-y-12 justify-items-center items-center pt-48 sm:pt-0';

  useEffect(() => {
    setTimeout(() => {
      setSize(size + 1);
    }, 250);
  }, [inView]);

  if (!data)
    return (
      <div className={gridClassName}>
        {Array.apply(null, { length: 24 }).map((e, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );

  return (
    <div className={gridClassName}>
      {data.map((products) => {
        return products.map((product, index) =>
          ProductCard({ ...product }, index * size),
        );
      })}
    </div>
  );
}
