const express = require('express');
const router = express.Router();

const qrService = require('../services/qrService');
const { renderHome } = require('../controllers/qrController');
router.get('/', renderHome);


router.get('/api/estilos', qrService.obtenerEstilos);
router.post('/api/generar-qr', qrService.generarQR);

module.exports = router;
