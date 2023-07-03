import Image from "next/image";
import Link from "next/link";

export default function ProductCard() {
  const image_link =
    "https://cdn.shopify.com/s/files/1/0105/8592/products/IMG_8978.jpg?v=1675111387";
    const image_link_alt =
    "https://cdn.shopify.com/s/files/1/0105/8592/products/IMG_7143_720x.heic?v=1675111387";
  const description = "Ring from tunnelvision";
  const productPage = 'https://shoptunnelvision.com/collections/womens-accessories/products/evolution-stainless-steel-ring';

  return (
    <div className="max-w-[250px]">
      <Link href={productPage}>
        <div className="relative" >
          <Image
            alt={description}
            src={image_link}
            width={250}
            height={150}
          />
          <Image
            className=" absolute top-0 left-0 opacity-0 transition-opacity duration-300 transform hover:opacity-100"
            alt={description}
            src={image_link_alt}
            width={250}
            height={150}
          />
        </div>
      </Link>
      <h2 className=" text-center">{description}</h2>
    </div>
  );
}
