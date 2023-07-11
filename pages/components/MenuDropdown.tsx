import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
interface MenuDropdownProps {
  title: string;
  priority: boolean;
  menuItems: Array<string>;
}

export default function MenuDropdown({ title, menuItems }: MenuDropdownProps) {
  return (
    <Menu>
      <MenuButton
        className=" font-semibold"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        {title}
      </MenuButton>
      <MenuList>
        {menuItems?.map((item, index) => {
          return <MenuItem key={index}>{item}</MenuItem>;
        })}
      </MenuList>
    </Menu>
  );
}
