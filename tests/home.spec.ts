import { test, expect } from '@playwright/test';

test.describe('Página Home - Noticias', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8100/login');
    await page.getByPlaceholder('Correo').fill('admin@admin.cl');
    await page.getByPlaceholder('Contraseña').fill('1234');
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await page.waitForURL('**/home');
  });

  test('debería mostrar al menos una noticia', async ({ page }) => {
    await expect(page.locator('ion-item')).toHaveCountGreaterThan(0);
  });

  test('cada noticia debería tener título, fecha y link', async ({ page }) => {
    const item = page.locator('ion-item').first();
    await expect(item.locator('h3')).toBeVisible();
    await expect(item.locator('p').nth(0)).toBeVisible();
    await expect(item.locator('a')).toHaveAttribute('href', /http/);
  });

  test('si existe imagen, debe mostrarse correctamente', async ({ page }) => {
    const images = page.locator('ion-thumbnail img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      await expect(images.nth(i)).toHaveAttribute('src', /http.*\.(jpg|jpeg|png|webp)/);
    }
  });
});
