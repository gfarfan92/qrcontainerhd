const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');

// DefinO las rutas para los QR
router.get('/estilos', qrController.obtenerEstilos);
router.post('/generar-qr', qrController.generarQR);

module.exports = router;
