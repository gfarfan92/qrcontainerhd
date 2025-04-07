const express = require("express");
const cors = require("cors");
const path = require("path");
const nocache = require("nocache");

const { obtenerEstilosQR } = require("./config/qrConfig");
const qrRoutes = require("./routes/qrRoutes");

const app = express();
const PORT = 4021;

app.use(nocache());

app.use(cors({
  origin: "*",
  methods: "GET, POST, OPTIONS",
  allowedHeaders: "Content-Type"
}));

app.use(express.json());

// Endpoint para obtener estilos (sin cache)
app.get("/api/estilos", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.json(obtenerEstilosQR());
});

// Endpoint para generar QR
app.use("/api", qrRoutes); // Aquí ya manejás POST /generar-qr y otros si hay

// Servir archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/img", express.static(path.join(__dirname, "public", "img")));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
