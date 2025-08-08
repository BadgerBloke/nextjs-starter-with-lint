'use client';

import { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';

import { DropdownMenuItem } from '~/components/ui/dropdown-menu';

const NonSelectableMenuItem = (props: DropdownMenuItemProps) => (
    <DropdownMenuItem onSelect={e => e.preventDefault()} {...props} />
);

export default NonSelectableMenuItem;
