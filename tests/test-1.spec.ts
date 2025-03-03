import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/');
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).click();
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).fill('iphone');
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).press('Enter');
  await page.getByRole('button', { name: 'Buscar' }).click();
  await page.getByRole('link', { name: 'Apple iPhone 16 (128 GB) - Negro', exact: true }).click();
  await page.getByRole('button', { name: 'Comprar ahora' }).first().click();
  });

  test('test uno', async ({ page }) => {
    await page.goto('https://www.mercadolibre.com.co/');
    await page.getByRole('link', {name: "Mis compras"}).click();
    //await page.pause()
    });

    test('test dos', async ({ page }) => {
      await page.goto('https://www.mercadolibre.com.co/');
      await page.getByRole('link', {name: 'Ingresa', exact: true }).click();
      await page.pause()
      });