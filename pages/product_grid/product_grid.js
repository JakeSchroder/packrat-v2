import ProductCard from "./product_card";
import useSWRInfinite from "swr/infinite";
import { useEffect } from "react";
import { fetcher, getKey } from "../services/fetcher";

export default function ProductGrid({ inView }) {
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);

  useEffect(() => {
    setTimeout(() => {
      setSize(size + 1);
    }, 250);
  }, [inView]);

  if (!data) return <div>loading</div>;

  return (
    <div className="  grid grid-cols-4 space-x-1  space-y-5 align-bottom ">
      {data.map((products) => {
        return products.map((product, index) =>
          ProductCard({ ...product }, index * size)
        );
      })}
    </div>
  );
}
