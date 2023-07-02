import Image from "next/image";

export default function ProductCard() {
  const image_link =
    "https://cdn.shopify.com/s/files/1/0105/8592/products/IMG_8978.jpg?v=1675111387";
  const description = "Ring from tunnelvision";

  return (
    <div className=" ">
      <Image
        alt={description}
        src={image_link}
        width={250}
        height={150}
      ></Image>
    </div>
  );
}
