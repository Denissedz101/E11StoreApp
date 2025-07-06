import { test, expect } from '@playwright/test';

test.describe('Navegación del menú lateral', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8100/login');
    await page.getByPlaceholder('Correo').fill('admin@admin.cl');
    await page.getByPlaceholder('Contraseña').fill('1234');
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await page.waitForURL('**/home');
  });

  test('debe navegar a Mi Perfil desde el menú', async ({ page }) => {
    await page.getByRole('button', { name: /menú/i }).click();
    await page.getByText('Mi Perfil').click();
    await expect(page).toHaveURL(/\/mi-perfil/);
    await expect(page.getByText('Modificar Datos')).toBeVisible();
  });

  test('debe navegar a Contacto desde el menú', async ({ page }) => {
    await page.getByRole('button', { name: /menú/i }).click();
    await page.getByText('Contacto').click();
    await expect(page).toHaveURL(/\/contacto/);
    await expect(page.getByText('Formulario de Contacto')).toBeVisible();
  });
});
