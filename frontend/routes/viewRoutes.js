const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');

// Redirigir la raíz "/" a "/login"
router.get('/', (req, res) => {
  res.redirect('/login');
});

// Ruta pública para el login
router.get('/login', (req, res) => {
  res.render('home', { isLoggedIn: false });
});

// Ruta protegida para generar QR
router.get('/generarqr', checkAuth, (req, res) => {
  res.render('home', { isLoggedIn: true });
});

module.exports = router;
