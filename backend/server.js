const express = require("express");
 const cors = require("cors");
 const path = require("path");

 const qrRoutes = require("./routes/qrRoutes");

 const app = express();
 const PORT = 4021;
 app.use(express.static(path.join(__dirname, "../frontend")));

 app.use(cors({
    origin: "*",
    methods: "GET, POST, OPTIONS",
    allowedHeaders: "Content-Type"
}));

app.use(express.json());
app.use("/img", express.static(path.join(__dirname, "public","img")));

app.use("/generar-qr", qrRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
