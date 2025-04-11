const express = require('express');
const router = express.Router();

const qrService = require('../services/qrService');
const { renderHome } = require('../controllers/qrController');
router.get('/', renderHome);


router.get('/api/estilos', qrService.obtenerEstilos);

//llego paquete de app.js y ahora lo direcciono a qrService
router.post('/api/generar-qr', qrService.generarQR);

module.exports = router;
