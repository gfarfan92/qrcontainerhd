const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController'); // Asegúrate de que existe este controlador

// Verificar sesión
router.get('/verificar-sesion', loginController.verificarSesion);

// Solicitar token
router.post('/solicitar-token', loginController.solicitarToken);

// Validar token
router.post('/validar-token', loginController.validarToken);

// Cerrar sesión
router.post('/cerrar-sesion', loginController.cerrarSesion);


module.exports = router;
