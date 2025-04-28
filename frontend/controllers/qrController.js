// frontend/controllers/qrController.js
const qrService = require('../services/qrService');

/**
 * GET /api-frontend/qr/estilos
 */
async function obtenerEstilos(req, res) {
  try {
    const data = await qrService.fetchEstilos();
    res.json(data);
  } catch (err) {
    console.error('Error en obtenerEstilos:', err);
    res.status(500).json({ error: 'No se lograron obtener los estilos desde QR HostDime' });
  }
}

/**
 * POST /api-frontend/qr/generar-qr
 */
async function generarQR(req, res) {
  try {
    // Validación de los datos en el body, puedes hacerla más detallada según sea necesario
    const { url, personalUrl, style, size, type } = req.body;
    if (!url || !style || !size || !type) {
      return res.status(400).json({ error: 'Faltan parámetros necesarios para generar el QR' });
    }

    const data = await qrService.createQR(req.body);
    res.json(data);
  } catch (err) {
    console.error('Error en generarQR:', err);
    res.status(500).json({ error: 'No se logró generar el QR desde HostDime' });
  }
}

async function renderHome(req, res) {
  res.render('home');  // O el nombre de la vista que deseas renderizar
}

module.exports = {
  renderHome,
  obtenerEstilos,
  generarQR
};