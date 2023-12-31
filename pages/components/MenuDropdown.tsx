import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
interface MenuDropdownProps {
  title: string;
  priority: boolean;
  menuItems: Array<string>;
  onClick: Function;
}

export default function MenuDropdown({
  title,
  menuItems,
  onClick,
}: MenuDropdownProps) {
  return (
    <Menu closeOnBlur={true} closeOnSelect={true} preventOverflow={true}>
      <MenuButton
        className=" font-semibold h-5 inline-block"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        {title}
      </MenuButton>
      <MenuList className=" box-border border-2 border-text rounded-md bg-background relative">
        {menuItems?.map((item, index) => {
          return (
            <MenuItem
              className=" hover:bg-accent hover:font-medium p-2 h-8"
              key={index}
              onClick={() => onClick(item)}
            >
              {item.replaceAll('_', ' ')}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
