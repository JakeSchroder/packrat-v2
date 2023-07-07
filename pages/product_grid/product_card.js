import Image from "next/image";
import Link from "next/link";

export default function ProductCard(props, index) {
  const errorImage =
    "https://static2.bigstockphoto.com/0/8/2/large1500/2802007.jpg";
  const productURL = `${props.url}/products/${props.handle}?variant=${props.variants[0]["id"]}`;

  return (
    <div key={index} className="max-w-[250px] min-w-[250px]">
      <Link href={productURL}>
        <div className="relative">
          <Image
            alt={props.title}
            src={
              props.images[0] !== undefined
                ? props.images[0]["src"]
                : errorImage
            }
            width={250}
            height={150}
            placeholder="empty"
          />
          <Image
            className=" absolute top-0 left-0 opacity-0 transition-opacity duration-300 transform hover:opacity-100"
            alt={props.title}
            src={
              props.images[1] !== undefined
                ? props.images[1]["src"]
                : errorImage
            }
            width={250}
            height={150}
            placeholder="empty"
          />
        </div>
      </Link>
      <h2 className=" text-center">{props.title}</h2>
    </div>
  );
}
ProductCard.defaultProps = {
  title: "",
  handle: "",
  variants: {
    0: {
      id: "",
    },
  },
  images: {
    0: {
      src: "",
    },
    1: {
      src: "",
    },
  },
  vendor: "",
  tags: "",
  product_type: "",
  url: "",
};
