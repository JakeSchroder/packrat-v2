import MenuDropdown from '../components/MenuDropdown';
import Logo from '../components/Logo';
import { CATEGORIES, SORT_ORDER_MAP } from '../../src/constants/products';
export default function Header({ setCategoryFilter, setOrderSort }) {
  return (
    <div className=" sm:hidden fixed min-w-full bg-background z-10 ">
      <div className=" flex flex-row items-center justify-between px-24 py-1 ">
        <MenuDropdown
          title={'Filter'}
          menuItems={CATEGORIES}
          onClick={setCategoryFilter}
        />
        <MenuDropdown
          title={'Sort'}
          menuItems={Object.keys(SORT_ORDER_MAP)}
          onClick={setOrderSort}
        />
        <Logo />
        <button className=" font-semibold">Account</button>
        <button className=" font-semibold">Cart</button>
      </div>
      <hr className="border-4" />
    </div>
  );
}
