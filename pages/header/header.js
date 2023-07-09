import Image from 'next/image';
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
        <button className=" font-semibold">
          <div className="flex">
            <span>Shop All</span>
            <Image
              src="/down-arrow.svg"
              alt="Down Arrow"
              width={24}
              height={24}
              priority
            />
          </div>
        </button>
        <button className=" font-semibold">
          <div className="flex">
            <span>Sort</span>
            <Image
              src="/down-arrow.svg"
              alt="Down Arrow"
              width={24}
              height={24}
              priority
            />
          </div>
        </button>
        <Image
          className=" w-auto h-auto "
          src="/packrat_logo.svg"
          alt="Packrat logo"
          width="150"
          height="150"
          priority
        />
        <button className=" font-semibold">Account</button>
        <button className=" font-semibold">Cart</button>
      </div>
      <hr className="border-4" />
    </>
  );
}
