import MenuDropdown from '../components/MenuDropdown';
import Logo from '../components/Logo';
import { CATEGORIES, SORT_ORDER_MAP } from '../../src/constants/products';

export default function Header() {
  return (
    <>
      <div className=" flex justify-between px-24 py-6">
        <MenuDropdown title={'Filter'} menuItems={CATEGORIES} />
        <MenuDropdown title={'Sort'} />
        <Logo />
        <button className=" font-semibold">Account</button>
        <button className=" font-semibold">Cart</button>
      </div>
      <hr className="border-4" />
    </>
  );
}
