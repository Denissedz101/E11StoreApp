import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('debe iniciar sesión con credenciales válidas', async ({ page }) => {
    await page.goto('http://localhost:8100/login');
    await page.getByPlaceholder('Correo').fill('admin@admin.cl');
    await page.getByPlaceholder('Contraseña').fill('1234');
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await expect(page).toHaveURL(/\/home/);
    await expect(page.getByText('Bienvenido')).toBeVisible();
  });

  test('debe mostrar error si las credenciales son incorrectas', async ({ page }) => {
    await page.goto('http://localhost:8100/login');
    await page.getByPlaceholder('Correo').fill('usuario@mal.com');
    await page.getByPlaceholder('Contraseña').fill('wrongpass');
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await expect(page.getByText('Error')).toBeVisible();
  });
});
