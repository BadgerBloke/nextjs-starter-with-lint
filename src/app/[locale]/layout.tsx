import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { routing } from '~/i18n/routing';

export const generateStaticParams = () => routing.locales.map(locale => ({ locale }));

const LocaleLayout = async ({ children, params }: LayoutProps<'/[locale]'>) => {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) notFound();

    setRequestLocale(locale);

    return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
};

export default LocaleLayout;
