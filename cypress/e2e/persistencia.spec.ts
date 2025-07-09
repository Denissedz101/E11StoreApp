import { test, expect } from '@playwright/test';

test.describe('Persistencia de sesión', () => {
  test.beforeAll(async ({ page }) => {
    await page.goto('http://localhost:8100/login');
    await page.getByPlaceholder('Correo').fill('admin@admin.cl');
    await page.getByPlaceholder('Contraseña').fill('1234');
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await expect(page).toHaveURL(/\/home/);
  });

  test('debe mantener la sesión al recargar', async ({ page }) => {
    await page.reload();
    await expect(page).toHaveURL(/\/home/);
    await expect(page.getByText('Bienvenido')).toBeVisible();
  });

  test('debe mantener sesión tras cerrar y abrir navegador (localStorage)', async ({ context }) => {
    const page = await context.newPage();
    await page.goto('http://localhost:8100/');
    const token = await page.evaluate(() => localStorage.getItem('authToken'));
    expect(token).not.toBeNull();
  });
});
