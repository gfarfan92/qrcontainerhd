const express = require('express');
const router  = express.Router();
const bloginController = require('../controllers/bloginController');

// Rutas para login y manejo de sesión bajo '/api-backend'
router.post('/solicitar-token',  bloginController.solicitarToken);
router.post('/validar-token',     bloginController.validarToken);
router.post('/reenviar-token',    bloginController.reenviarToken);
router.post('/cerrar-sesion',     bloginController.cerrarSesion);
router.get('/verificar-sesion', bloginController.verificarSesion);

module.exports = router;
