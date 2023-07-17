import { Inter } from 'next/font/google';
import Header from './header/header';
import ProductGrid from './product_grid/product_grid';
import Footer from './footer/footer';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const [categoryFilter, setCategoryFilter] = useState('Shop_All');
  const [orderSort, setOrderSort] = useState('random');
  return (
    <main>
      <Header
        setCategoryFilter={setCategoryFilter}
        setOrderSort={setOrderSort}
      />
      <ProductGrid
        inView={inView}
        categoryFilter={categoryFilter}
        orderSort={orderSort}
      />
      <div ref={ref} className=" pt-12">
        <Footer />
      </div>
    </main>
  );
}
