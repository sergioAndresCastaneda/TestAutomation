const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, '../results/report.json');
const outputPath = path.resolve(__dirname, '../results/report.html');

const resultados = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

const rows = resultados.map((r, i) => `
  <tr style="background-color: ${r.passed ? '#e6ffed' : '#ffe6e6'}">
    <td>${i + 1}</td>
    <td>${r.clienteId}</td>
    <td>${r.status}</td>
    <td>${r.tiempoMs} ms</td>
    <td>${r.nombreEsperado}</td>
    <td>${r.nombreRecibido || '—'}</td>
    <td style="color: ${r.passed ? 'green' : 'red'}; font-weight: bold">
      ${r.passed ? '✅ OK' : '❌ Falló'}
    </td>
  </tr>
`).join('');

const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Reporte de Pruebas API</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; background: #f9f9f9; }
    table { width: 100%; border-collapse: collapse; background: white; }
    th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
    th { background: #333; color: white; }
  </style>
</head>
<body>
  <h1>🧪 Reporte de Pruebas API</h1>
  <p>Total pruebas: ${resultados.length}</p>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Cliente ID</th>
        <th>Status</th>
        <th>Tiempo</th>
        <th>Esperado</th>
        <th>Recibido</th>
        <th>Resultado</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
</body>
</html>
`;

fs.writeFileSync(outputPath, html, 'utf-8');
console.log(`✅ Reporte HTML generado en: ${outputPath}`);
