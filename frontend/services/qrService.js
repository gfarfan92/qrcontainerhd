// frontend/services/qrService.js
const BASE_QR_API = process.env.QR_API_URL || 'http://localhost:4021/api-backend';

/**
 * Obtiene la lista de estilos desde el backend QR.
 */
async function fetchEstilos() {
  try {
    const resp = await fetch(`${BASE_QR_API}/estilos`);
    if (!resp.ok) throw new Error(`Error al obtener estilos del backend QR: ${resp.status}`);
    return resp.json();
  } catch (err) {
    console.error(err);
    throw new Error('Error al obtener estilos del backend QR');
  }
}

/**
 * Genera un código QR con los parámetros dados.
 */
async function createQR({ url, personalUrl, style, size, type }) {
  try {
    const resp = await fetch(`${BASE_QR_API}/generar-qr`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, personalUrl, style, size, type })
    });
    if (!resp.ok) {
      const err = await resp.json();
      throw new Error(err.error || `Error al generar QR: ${resp.status}`);
    }
    return resp.json();
  } catch (err) {
    console.error(err);
    throw new Error('Error al generar QR');
  }
}

module.exports = {
  fetchEstilos,
  createQR
};
