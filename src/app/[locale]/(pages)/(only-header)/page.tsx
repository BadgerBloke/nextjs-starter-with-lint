import { useTranslations } from 'next-intl';

const HomePage = () => {
    const t = useTranslations('home');
    return <main className="flex flex-col items-center justify-between p-24">{t('title')}</main>;
};

export default HomePage;
