const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// traigo las funciones directamente del controlador
router.post('/solicitar-token', authController.solicitarToken);
router.post('/validar-token', authController.validarToken);
router.post('/reenviar-token', authController.reenviarToken);

module.exports = router;
