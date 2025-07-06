import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000, // 30 segundos por prueba
  expect: {
    timeout: 5000, 
  },
  fullyParallel: true, // ejecuta pruebas en paralelo
  retries: 0, 
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:8100',
    headless: true,
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure', // graba video si falla
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure', // rastreo si hay error
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
  webServer: {
    command: 'ionic serve --port=8100',
    port: 8100,
    timeout: 120 * 1000,
    reuseExistingServer: true,
  },
});
