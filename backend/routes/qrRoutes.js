const express = require("express");
const router = express.Router();
const { generarQR } = require("../controllers/qrController");
const { obtenerEstilosQR } = require("../config/qrConfig");

// Recibimos los datos del frontend y enviamos a qrController para que realice el qr
router.post("/generar-qr", generarQR);

// Ruta para obtener los estilos
router.get("/estilos", (req, res) => {
    const estilos = obtenerEstilosQR();
    res.json(estilos);
});

module.exports = router;
