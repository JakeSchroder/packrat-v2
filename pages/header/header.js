import Image from "next/image";
export default function Header() {
  const typeFilter = [
    "All",
    "T-Shirts",
    "Tops",
    "Layers",
    "Pullovers",
    "Shorts",
    "Pants",
    "Dresses_&_Skirts",
    "Shoes",
    "Jewelry",
    "Accessories",
    "Wildcard_Clothing",
    "Goods",
  ];

  return (
    <div className=" flex space-x-7 ">
      <div className=" inline-block">
        <div className=" bg-secondary-button rounded-md hover">
          <button className=" rounded-lg focus:bg-primary-button">
            Filter
          </button>
        </div>
        <ul className=" opacity-0">
          {typeFilter.map((filter, index) => (
            <li key={index}>{filter}</li>
          ))}
        </ul>
      </div>
      <Image
        className=" w-auto h-auto"
        src="/packrat_logo.svg"
        alt="Packrat logo"
        width="150"
        height="150"
        priority
      />
    </div>
  );
}
