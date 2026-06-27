import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HiddenForPath from '~/components/atoms/hidden-for-path';
import { usePathname } from '~/i18n/navigation';

describe('HiddenForPath', () => {
    it('renders children when the current pathname differs from the path prop', () => {
        vi.mocked(usePathname).mockReturnValue('/');

        render(
            <HiddenForPath pathname="/about">
                <span>visible content</span>
            </HiddenForPath>
        );

        expect(screen.getByText('visible content')).toBeInTheDocument();
    });

    it('renders nothing when the current pathname matches the path prop', () => {
        vi.mocked(usePathname).mockReturnValue('/');

        const { container } = render(
            <HiddenForPath pathname="/">
                <span>hidden content</span>
            </HiddenForPath>
        );

        expect(container).toBeEmptyDOMElement();
    });

    it('hides when an overridden pathname matches', () => {
        vi.mocked(usePathname).mockReturnValue('/dashboard');

        const { container } = render(
            <HiddenForPath pathname="/dashboard">
                <span>gone</span>
            </HiddenForPath>
        );

        expect(container).toBeEmptyDOMElement();
    });

    it('shows when an overridden pathname differs', () => {
        vi.mocked(usePathname).mockReturnValue('/dashboard');

        render(
            <HiddenForPath pathname="/settings">
                <span>shown</span>
            </HiddenForPath>
        );

        expect(screen.getByText('shown')).toBeInTheDocument();
    });
});
