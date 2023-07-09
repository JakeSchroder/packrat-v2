import Image from 'next/image';

export default function Logo() {
  return (
    <Image
      className=" w-auto h-auto "
      src="/packrat_logo.svg"
      alt="Packrat logo"
      width="150"
      height="150"
      priority
    />
  );
}
