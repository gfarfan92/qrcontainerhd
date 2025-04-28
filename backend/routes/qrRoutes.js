// backend/routes/qrRoutes.js
const express = require("express");
const router = express.Router();
const { generarQR } = require("../controllers/qrController");
const { obtenerEstilosQR } = require("../config/qrConfig");

// Rutas para los códigos QR bajo '/api-backend'
router.post("/generar-qr", generarQR);

// Ruta para obtener los estilos bajo '/api-backend'
router.get("/estilos", (req, res) => {
    const estilos = obtenerEstilosQR();
    res.json(estilos);
});

module.exports = router;
