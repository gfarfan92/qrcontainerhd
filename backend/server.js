const express = require("express");
const cors = require("cors");
const path = require("path");

const qrRoutes = require("./routes/qrRoutes");

const app = express();
const PORT = 4021;

app.use(cors({
    origin: "*",
    methods: "GET, POST, OPTIONS",
    allowedHeaders: "Content-Type"
}));

app.use(express.json());

// Define endpoints de API con un prefijo /api
app.get("/api/estilos", (req, res) => {
    const { estilosQR } = require("./config/qrConfig");
    res.json(estilosQR);
});
app.use("/api/generar-qr", qrRoutes);

// Servir archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/img", express.static(path.join(__dirname, "public", "img")));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
