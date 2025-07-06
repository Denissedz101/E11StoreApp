import { test, expect } from '@playwright/test';

test('Visita la página de ejemplo', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
