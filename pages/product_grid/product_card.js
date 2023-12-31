import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard(props, index) {
  const errorImage =
    'https://static2.bigstockphoto.com/0/8/2/large1500/2802007.jpg';
  const productURL = `${props.url}/products/${props.handle}?variant=${props.variants[0]['id']}`;

  return (
    <div key={index} className=" flex-row max-w-[200px] min-w-[1px]">
      <Link href={productURL} className=" block relative overflow-hidden z-0">
        <Image
          alt={props.title}
          className=" rounded-lg justify-items-center hover:opacity-0"
          src={
            props.images[0] !== undefined ? props.images[0]['src'] : errorImage
          }
          width={250}
          height={150}
          unoptimized
          placeholder="empty"
        />
        <Image
          alt={props.title}
          className=" absolute top-0 left-0 rounded-lg justify-items-center opacity-0 transition-opacity duration-500 hover:opacity-100"
          src={
            props.images[1] !== undefined ? props.images[1]['src'] : errorImage
          }
          width={250}
          height={150}
          unoptimized
          placeholder="empty"
        />
      </Link>
      <h2 className=" text-center ">${props.variants[0]['price']}</h2>
    </div>
  );
}
ProductCard.defaultProps = {
  title: '',
  handle: '',
  variants: {
    0: {
      id: '',
    },
  },
  images: {
    0: {
      src: '',
    },
    1: {
      src: '',
    },
  },
  vendor: '',
  tags: '',
  product_type: '',
  url: '',
};
