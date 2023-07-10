import MenuDropdown from '../components/MenuDropdown';
import Logo from '../components/Logo';

export default function Header() {
  const typeFilter = [
    'All',
    'T-Shirts',
    'Tops',
    'Layers',
    'Pullovers',
    'Shorts',
    'Pants',
    'Dresses_&_Skirts',
    'Shoes',
    'Jewelry',
    'Accessories',
    'Wildcard_Clothing',
    'Goods',
  ];

  return (
    <>
      <div className=" flex justify-between px-24 py-6">
        <MenuDropdown title={'Shop All'} priority></MenuDropdown>
        <MenuDropdown title={'Sort'} priority></MenuDropdown>
        <Logo />
        <button className=" font-semibold">Account</button>
        <button className=" font-semibold">Cart</button>
      </div>
      <hr className="border-4" />
    </>
  );
}
