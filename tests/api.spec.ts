import { test, expect, request } from '@playwright/test';
import fs from 'fs';

const requests = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));
for (const req of requests) {
  test(`Consultar cliente ${req.holderName}`, async ({ baseURL }) => {
    const apiContext = await request.newContext();

    // Construir URL con query params
    const queryString = new URLSearchParams(req.queryParams).toString();
    const url = `${baseURL}/api-cards-multitenant-core-issuance/v1/${req.cardId}?${queryString}`;

    const response = await apiContext.get(url, {
      headers: req.headers
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.nombre).toBe(req.nombreEsperado);
  });
}