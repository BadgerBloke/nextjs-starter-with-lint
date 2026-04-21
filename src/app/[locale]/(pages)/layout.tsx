import { Fragment } from 'react';

const PagesLayout = ({ children }: LayoutProps<'/[locale]'>) => <Fragment>{children}</Fragment>;

export default PagesLayout;
