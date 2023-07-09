import Image from 'next/image';

interface MenuDropdownProps {
  title: string;
  priority: boolean;
}

export default function MenuDropdown({ title, priority }: MenuDropdownProps) {
  return (
    <>
      <button className=" font-semibold">
        <div className="flex">
          <span>{title}</span>
          <Image
            src="/down-arrow.svg"
            alt="Down Arrow"
            width={'24'}
            height={'24'}
            priority={priority}
            style={{ width: '24', height: '24' }}
          />
        </div>
      </button>
    </>
  );
}
