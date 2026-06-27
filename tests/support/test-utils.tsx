import { type RenderOptions, render } from '@testing-library/react';
import { type Locale, NextIntlClientProvider } from 'next-intl';
import type { ReactElement, ReactNode } from 'react';

import { SidebarProvider } from '~/components/ui/sidebar';

interface IntlRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    locale?: Locale;
    // Pass only the namespaces/keys a test needs — these are runtime messages,
    // not the full generated dictionary. Missing keys fall back to the key name
    // (see onError/getMessageFallback) so tests never throw on an absent message.
    messages?: Record<string, unknown>;
    // Wrap in SidebarProvider too — for components that call `useSidebar`.
    sidebar?: boolean;
}

const noop = () => {};

/**
 * Render a component that depends on next-intl (`useTranslations`, `useLocale`).
 * Components with no i18n dependency can use plain `render` from RTL instead.
 */
export function renderWithIntl(
    ui: ReactElement,
    { locale = 'en-US', messages = {}, sidebar = false, ...options }: IntlRenderOptions = {}
) {
    const Wrapper = ({ children }: { children: ReactNode }) => {
        const tree = sidebar ? <SidebarProvider>{children}</SidebarProvider> : children;
        return (
            <NextIntlClientProvider locale={locale} messages={messages} onError={noop} getMessageFallback={({ key }) => key}>
                {tree}
            </NextIntlClientProvider>
        );
    };

    return render(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
