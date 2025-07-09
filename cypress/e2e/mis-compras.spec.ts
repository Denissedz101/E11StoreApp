import { test, expect } from '@playwright/test';

test.describe('Mis Compras', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8100/login');
    await page.getByPlaceholder('Correo').fill('admin@admin.cl');
    await page.getByPlaceholder('Contraseña').fill('1234');
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await page.waitForURL('**/home');
    await page.locator('.btn-add-to-cart').first().click();
  });

  test('debe mostrar productos en el carrito', async ({ page }) => {
    await page.goto('http://localhost:8100/mis-compras');
    await expect(page.getByText('Mis Compras')).toBeVisible();
    await expect(page.locator('.compra-item')).toHaveCountGreaterThan(0);
  });
});
