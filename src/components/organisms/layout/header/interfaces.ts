import { LucideIcon } from 'lucide-react';

interface SimpleNavItem {
    label: string;
    href: string;
}

interface IconNavItem {
    label: string;
    icon: LucideIcon;
    href: string;
}

interface DescriptionNavItem {
    label: string;
    description: string;
    href: string;
}

export type NavItem =
    | {
          label: string;
          href: string;
          submenu?: never;
          type?: never;
          items?: never;
      }
    | {
          label: string;
          submenu: true;
          type: 'description';
          items: DescriptionNavItem[];
          href?: never;
      }
    | {
          label: string;
          submenu: true;
          type: 'simple';
          items: SimpleNavItem[];
          href?: never;
      }
    | {
          label: string;
          submenu: true;
          type: 'icon';
          items: IconNavItem[];
          href?: never;
      };
