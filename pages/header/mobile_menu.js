import MenuDropdown from '../components/MenuDropdown';
import { CATEGORIES, SORT_ORDER_MAP } from '../../src/constants/products';

export default function MobileMenu({ setCategoryFilter, setOrderSort }) {
  return (
    <>
      <div className=" invisible sm:visible flex flex-row items-center fixed bottom-6 justify-center min-w-full z-10">
        <div className="bg-accent rounded-md p-1 pr-4 space-x-6 box-border border-2 border-text">
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
          <button className=" font-semibold">Account</button>
          <button className=" font-semibold">Cart</button>
        </div>
      </div>
    </>
  );
}
