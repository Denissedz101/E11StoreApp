import { test, expect } from '@playwright/test';

test.describe('Mi Perfil', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8100/login');
    await page.getByPlaceholder('Correo').fill('admin@admin.cl');
    await page.getByPlaceholder('Contraseña').fill('1234');
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await page.goto('http://localhost:8100/mi-perfil');
  });

  test('debe mostrar datos actuales del usuario', async ({ page }) => {
    await expect(page.getByPlaceholder('Nombre')).toHaveValue('Administrador');
  });

  test('debe permitir modificar y guardar datos', async ({ page }) => {
    await page.getByPlaceholder('Nombre').fill('Nuevo Nombre');
    await page.getByRole('button', { name: 'Guardar' }).click();
    await expect(page.getByText('Datos actualizados')).toBeVisible();
  });
});
