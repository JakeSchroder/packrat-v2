import { Inter } from "next/font/google";
import ProductCard from "./product_grid/product_card";
import Header from "./header/header";
import ProductGrid from "./product_grid/product_grid";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main >
      <Header />
      <ProductGrid />
    </main>
  );
}
