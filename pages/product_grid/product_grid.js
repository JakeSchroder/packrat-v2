import ProductCard from "./product_card";
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function ProductGrid(){
    const { data, error, isLoading } = useSWR('/api/products?orderReq=random&categoryReq=Shop_All&pageIndex=5&pageSize=10', fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    return(
        <div className="  grid grid-cols-4 space-x-1  space-y-5 align-bottom ">
            {data.map((product, index) => ProductCard({ ...product }, index))}
        </div>
    )
}