const express = require("express");
const router = express.Router();
const { generarQR } = require("../controllers/qrController");

router.post("/", generarQR);

module.exports = router;
