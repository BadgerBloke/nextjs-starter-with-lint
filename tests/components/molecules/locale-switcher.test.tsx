import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import LocaleSwitcher from '~/components/molecules/locale-switcher';
import { useRouter } from '~/i18n/navigation';
import { renderWithIntl, screen } from '~test/support/test-utils';

describe('LocaleSwitcher', () => {
    it('renders a button displaying the current locale label', () => {
        renderWithIntl(<LocaleSwitcher />);

        // default locale from renderWithIntl is 'en-US'
        expect(screen.getByRole('button', { name: /English \(US\)/i })).toBeInTheDocument();
    });

    it('shows all locale options in the dropdown when opened', async () => {
        const user = userEvent.setup();
        renderWithIntl(<LocaleSwitcher />);

        await user.click(screen.getByRole('button', { name: /English \(US\)/i }));

        expect(await screen.findByText('Español (ES)')).toBeInTheDocument();
        expect(screen.getByText('English (UK)')).toBeInTheDocument();
        expect(screen.getByText('हिन्दी (IN)')).toBeInTheDocument();
    });

    it('calls router.replace with the chosen locale when a non-current item is clicked', async () => {
        const replace = vi.fn();
        vi.mocked(useRouter).mockReturnValue({
            replace,
            push: vi.fn(),
            prefetch: vi.fn(),
            back: vi.fn(),
            forward: vi.fn(),
            refresh: vi.fn(),
        } as ReturnType<typeof useRouter>);

        const user = userEvent.setup();
        renderWithIntl(<LocaleSwitcher />);

        await user.click(screen.getByRole('button', { name: /English \(US\)/i }));
        await user.click(await screen.findByText('Español (ES)'));

        // usePathname() returns '/' from the global mock
        expect(replace).toHaveBeenCalledWith('/', { locale: 'es-ES' });
    });
});
