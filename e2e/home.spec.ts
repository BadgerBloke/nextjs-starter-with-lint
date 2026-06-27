import { expect, test } from '@playwright/test';

test.describe('home page', () => {
    test('renders the welcome heading on the default locale', async ({ page }) => {
        await page.goto('/');

        await expect(page.getByRole('heading', { level: 1, name: 'Welcome to the Next.js Starter' })).toBeVisible();
    });

    test('shows the active locale', async ({ page }) => {
        await page.goto('/');

        // Default locale serves on the clean path (localePrefix: 'as-needed').
        await expect(page.getByText('en-US')).toBeVisible();
    });
});
