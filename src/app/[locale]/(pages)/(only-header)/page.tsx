import { useLocale, useTranslations } from 'next-intl';

const HomePage = () => {
    const t = useTranslations('home');
    const locale = useLocale();

    return (
        <main className="flex flex-col gap-8 max-w-3xl py-12">
            <header className="flex flex-col gap-3">
                <h1 className="text-3xl font-semibold tracking-tight">{t('title')}</h1>
                <p className="text-muted-foreground">{t('lead')}</p>
                <p className="text-sm text-muted-foreground">
                    {t('currentLocale')}:{' '}
                    <code className="font-mono rounded bg-muted px-1.5 py-0.5 text-foreground">{locale}</code>
                </p>
            </header>

            <section className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold">{t('configHeading')}</h2>
                <ul className="flex flex-col gap-1.5 text-sm list-disc pl-5 marker:text-muted-foreground">
                    <li>{t('configItems.translations')}</li>
                    <li>{t('configItems.routing')}</li>
                    <li>{t('configItems.bases')}</li>
                    <li>{t('configItems.switcher')}</li>
                </ul>
            </section>

            <section className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold">{t('removalHeading')}</h2>
                <ul className="flex flex-col gap-1.5 text-sm list-disc pl-5 marker:text-muted-foreground">
                    <li>{t('removalAi')}</li>
                    <li>{t('removalManual')}</li>
                </ul>
            </section>

            <section className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold">{t('docsHeading')}</h2>
                <ul className="flex flex-col gap-1.5 text-sm list-disc pl-5 marker:text-muted-foreground">
                    <li>{t('docsReadme')}</li>
                    <li>{t('docsStandards')}</li>
                </ul>
            </section>
        </main>
    );
};

export default HomePage;
