import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ThemeProvider } from '~/components/molecules/theme-provider';

describe('ThemeProvider', () => {
    it('renders its children', () => {
        render(
            <ThemeProvider>
                <p>child content</p>
            </ThemeProvider>
        );

        expect(screen.getByText('child content')).toBeInTheDocument();
    });

    it('renders children when theme props are supplied', () => {
        render(
            <ThemeProvider attribute="class" defaultTheme="dark">
                <span>themed content</span>
            </ThemeProvider>
        );

        expect(screen.getByText('themed content')).toBeInTheDocument();
    });
});
