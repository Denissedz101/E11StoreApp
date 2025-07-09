import { test, expect } from '@playwright/test';

test.describe('Registro de usuario', () => {
  test('debe registrar un nuevo usuario exitosamente', async ({ page }) => {
    await page.goto('http://localhost:8100/registro');
    await page.getByPlaceholder('Nombre').fill('Denisse');
    await page.getByPlaceholder('Correo').fill(`denisse${Date.now()}@mail.com`);
    await page.getByPlaceholder('Contraseña').fill('123456');
    await page.getByPlaceholder('Repetir contraseña').fill('123456');
    await page.getByRole('button', { name: 'Registrarse' }).click();

    await expect(page.getByText('Usuario registrado')).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });

  test('debe validar que las contraseñas coincidan', async ({ page }) => {
    await page.goto('http://localhost:8100/registro');
    await page.getByPlaceholder('Contraseña').fill('123456');
    await page.getByPlaceholder('Repetir contraseña').fill('654321');
    await page.getByRole('button', { name: 'Registrarse' }).click();
    await expect(page.getByText('Las contraseñas no coinciden')).toBeVisible();
  });
});
