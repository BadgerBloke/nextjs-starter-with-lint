import type { MessageOverride, MessageShape } from '~/global';

import type { routing } from './routing';

type Locale = (typeof routing)['locales'][number];
type BaseLocale = 'en' | 'es' | 'hi';

export const baseOf: Record<Locale, BaseLocale> = {
    'en-US': 'en',
    'en-GB': 'en',
    'es-ES': 'es',
    'es-MX': 'es',
    'hi-IN': 'hi',
};

export const loadBase: Record<BaseLocale, () => Promise<{ default: MessageShape }>> = {
    en: () => import('../../messages/en'),
    es: () => import('../../messages/es'),
    hi: () => import('../../messages/hi'),
};

export const loadOverlay: Record<Locale, () => Promise<{ default: MessageOverride }>> = {
    'en-US': () => import('../../messages/en-US'),
    'en-GB': () => import('../../messages/en-GB'),
    'es-ES': () => import('../../messages/es-ES'),
    'es-MX': () => import('../../messages/es-MX'),
    'hi-IN': () => import('../../messages/hi-IN'),
};
