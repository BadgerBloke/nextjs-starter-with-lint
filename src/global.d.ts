import type { routing } from '~/i18n/routing';
import type en from '../messages/en';

type DeepString<T> = T extends string ? string : { [K in keyof T]: DeepString<T[K]> };
type DeepPartial<T> = T extends string ? T : { [K in keyof T]?: DeepPartial<T[K]> };

export type MessageShape = DeepString<typeof en>;
export type MessageOverride = DeepPartial<MessageShape>;

declare module 'next-intl' {
    interface AppConfig {
        Locale: (typeof routing)['locales'][number];
        Messages: typeof en;
    }
}
