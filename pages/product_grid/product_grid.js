import ProductCard from "./product_card";
import useSWRInfinite from "swr/infinite";
import { useInView } from 'react-intersection-observer';
import { useEffect } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end
  return `/api/products?orderReq=random&categoryReq=Shop_All&pageIndex=${pageIndex}&pageSize=12`; // SWR key
};

export default function ProductGrid() {
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    setTimeout(() => {
        setSize(size+1)
    }, 250);
    }, [inView]);



  if (!data) return "loading";
  
  return (
    <div className="  grid grid-cols-4 space-x-1  space-y-5 align-bottom ">
      {data.map((products) => {
        return products.map((product, index) =>
          ProductCard({ ...product }, index * size)
        );
      })}
      <div ref={ref}>Hello</div>
    </div>
  );
}
