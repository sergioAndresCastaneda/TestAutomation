import { test, expect, request } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const requestsPath = path.resolve(__dirname, '../data/users2.json');
const outputPath = path.resolve(__dirname, '../results/report.json');
const requests = JSON.parse(fs.readFileSync(requestsPath, 'utf-8'));

// Array para guardar los resultados
const resultados: any[] = [];

for (const req of requests) {
  test(`Consultar cliente ${req.holderNameEsperado}`, async ({ baseURL }) => {
    const apiContext = await request.newContext();

    const queryString = new URLSearchParams(req.queryParams).toString();
    const url = `${baseURL}/api-cards-multitenant-core-issuance/v1/${req.cardId}?${queryString}`;

    const startTime = Date.now(); // ⏱️ Iniciar timer
    const response = await apiContext.get(url, {
      headers: req.headers
    });
    const duration = Date.now() - startTime; // ⏱️ Tiempo de respuesta

    const status = response.status();
    const ok = response.ok();
    let data: any = {};
    let passed = false;

    try {
      data = await response.json();
      expect(data.nombreEsperado).toBe(req.nombreEsperado);
      passed = true;
    } catch (e) {
      // No lanza error, solo captura para informe
      passed = false;
    }

    // Mostrar en consola
    console.log(`🧪 Cliente ${req.cardId} | Status: ${status} | Tiempo: ${duration}ms | Resultado: ${passed ? '✅ OK' : '❌ Falló'}`);

    // Guardar resultado
    resultados.push({
      clienteId: req.cardId,
      status,
      tiempoMs: duration,
      nombreRecibido: data.holderName || null,
      nombreEsperado: req.holderNameEsperado,
      passed
    });
  });
}

// Hook global para guardar resultados al final del test run
test.afterAll(async () => {
  fs.writeFileSync(outputPath, JSON.stringify(resultados, null, 2), 'utf-8');
  console.log(`📄 Informe exportado en: ${outputPath}`);
});
