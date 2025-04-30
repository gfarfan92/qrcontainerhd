const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Prefijo en server.js: app.use('/api-frontend/login', loginRoutes)
router.get(  '/verificar-sesion', loginController.verificarSesion);
router.post( '/solicitar-token',  loginController.solicitarToken);
router.post( '/validar-token',    loginController.validarToken);
router.post( '/cerrar-sesion',    loginController.cerrarSesion);

module.exports = router;
