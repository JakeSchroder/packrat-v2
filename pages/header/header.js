import MenuDropdown from '../components/MenuDropdown';
import Logo from '../components/Logo';
import { CATEGORIES, SORT_ORDER_MAP } from '../../src/constants/products';
export default function Header({ setFilter, setSort }) {
  return (
    <div className="fixed min-w-full bg-background z-10 ">
      <div className=" flex flex-row items-center justify-between px-24 py-6">
        <MenuDropdown
          title={'Filter'}
          menuItems={CATEGORIES}
          handleClick={setFilter}
        />
        <MenuDropdown
          title={'Sort'}
          menuItems={Object.keys(SORT_ORDER_MAP)}
          handleClick={setSort}
        />
        <Logo />
        <button className=" font-semibold">Account</button>
        <button className=" font-semibold">Cart</button>
      </div>
      <hr className="border-4" />
    </div>
  );
}
