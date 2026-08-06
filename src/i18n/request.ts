import { locale as localeParam } from 'next/root-params';
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { baseOf, loadBase, loadOverlay } from './bases';
import { routing } from './routing';

const deepMerge = <T extends Record<string, unknown>>(base: T, over: Record<string, unknown>): T => {
    const out: Record<string, unknown> = { ...base };
    for (const [k, v] of Object.entries(over ?? {})) {
        out[k] =
            v && typeof v === 'object' && !Array.isArray(v)
                ? deepMerge((out[k] ?? {}) as Record<string, unknown>, v as Record<string, unknown>)
                : v;
    }
    return out as T;
};

export default getRequestConfig(async () => {
    const requested = await localeParam();
    const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

    const [{ default: baseMsgs }, { default: overlay }] = await Promise.all([
        loadBase[baseOf[locale]](),
        loadOverlay[locale](),
    ]);

    return { locale, messages: deepMerge(baseMsgs, overlay) };
});
