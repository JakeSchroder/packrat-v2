import { Inter } from "next/font/google";
import Header from "./header/header";
import ProductGrid from "./product_grid/product_grid";
import Footer from "./footer/footer"
import { useInView } from "react-intersection-observer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  return (
      <main >
        <Header />
        <ProductGrid inView={inView}/>
        <div ref={ref} className=" pt-12">
          <Footer />
        </div>
      </main>

  );
}
