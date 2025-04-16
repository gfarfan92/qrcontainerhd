const express = require("express");
const cors = require("cors");
const path = require("path");
const nocache = require("nocache");
const session = require("express-session");

const { DIRECTORIO_PUBLICO, DIRECTORIO_IMAGENES } = require("./config/config");
const qrRoutes = require("./routes/qrRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 4021;

app.use(nocache());

app.use(cors({
  origin: "*",
  methods: "GET, POST, OPTIONS",
  allowedHeaders: "Content-Type"
}));

app.use(express.json());


app.use(session({
  secret: 'clave-super-secreta',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 10 * 60 * 1000 } 
}));

// Rutas API
app.use("/api", qrRoutes);           // incluye /generar-qr y /estilos
app.use("/api/auth", authRoutes);    // login por token

// Rutas estáticas
app.use(express.static(DIRECTORIO_PUBLICO));
app.use("/img", express.static(DIRECTORIO_IMAGENES));

app.listen(PORT, () => {
  console.log(`✅ Backend qrHostDime corriendo en http://localhost:${PORT}`);
});
