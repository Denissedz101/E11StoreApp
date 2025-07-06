import { test, expect } from '@playwright/test';

test.describe('Contacto', () => {
  test('debe enviar mensaje correctamente', async ({ page }) => {
    await page.goto('http://localhost:8100/contacto');
    await page.getByPlaceholder('Nombre').fill('Denisse');
    await page.getByPlaceholder('Correo').fill('denisse@correo.com');
    await page.getByPlaceholder('Mensaje').fill('Hola, necesito ayuda.');
    await page.getByRole('button', { name: 'Enviar' }).click();
    await expect(page.getByText('Mensaje enviado')).toBeVisible();
  });

  test('debe validar campos requeridos', async ({ page }) => {
    await page.goto('http://localhost:8100/contacto');
    await page.getByRole('button', { name: 'Enviar' }).click();
    await expect(page.getByText('Campo requerido')).toBeVisible();
  });
});
