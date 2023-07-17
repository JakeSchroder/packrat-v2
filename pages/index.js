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
  const [filter, setFilter] = useState('Shop_All');
  const [sort, setSort] = useState('random');
  return (
    <main>
      <Header setFilter={setFilter} setSort={setSort} />
      <ProductGrid inView={inView} filter={filter} sort={sort} />
      <div ref={ref} className=" pt-12">
        <Footer />
      </div>
    </main>
  );
}
