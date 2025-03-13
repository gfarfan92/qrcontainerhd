

 // server.js
 const express = require("express");
 const cors = require("cors");
 const { QRCodeStyling } = require("qr-code-styling/lib/qr-code-styling.common");
 const nodeCanvas = require("canvas");
 const { JSDOM } = require("jsdom");
 const fs = require("fs");
 const path = require("path");
 
 
 
 const app = express();
 const PORT = 4021;
 
 
 
 app.use(cors({
     origin: "*",
     methods: "GET, POST, OPTIONS",
     allowedHeaders: "Content-Type"
 }));
 
 app.use(express.static(path.join(__dirname, "../frontend")));
 app.use(express.json());
 app.use("/img", express.static(path.join(__dirname, "img")));
 
 
 
 
 
 /* desde aca para poder validar y generar shortUll */
 
 const isValidUrl = (url) => {
     try {
         new URL(url);
         return true;
     } catch (err) {
         return false;
     }
 };
 
 app.post("/shorten", async (req, res) => {
     const { longUrl } = req.body;
 
     if (!longUrl || !isValidUrl(longUrl)) {
         return res.status(400).json({ error: "URL inválida o faltante" });
     }
 
 
     try {
         const response = await fetch("https://qrlink.hostdi.me/rest/v3/short-urls", {
             method: "POST",
             headers: {
                 "X-Api-Key": "7c24e07c7d1a-49a9-6465-937e-05e1f965",
                 "Content-Type": "application/json",
             },
             body: JSON.stringify({ longUrl }),
         });
 
         const data = await response.json();
 
         if (!response.ok) throw new Error(data.error || "Error al acortar la URL");
 
         res.json({ shortUrl: data.shortUrl });
     } catch (error) {
         console.error("Error acortando la URL:", error);
         res.status(500).json({ error: "No se pudo acortar la URL" });
     }
 
 
     
 });
 
 
 
 
 
 
 
 
 // Leer el logo en Base64
 let logoBase64;
 try {
     const logoPath = path.join(__dirname,"img","hostdimelogo.png");
     logoBase64 = fs.readFileSync(logoPath, { encoding: "base64" });
 } catch (error) {
     console.error("Error: No se pudo leer el archivo del logo.", error);
 }
 
 
 // Mapeo de formatos de imagen permitidos
 const Wtype = {
     png: `data:image/png;base64,${logoBase64}`,
     svg: `data:image/svg+xml;base64,${logoBase64}`
 };
 
 // Estilos preconfigurados
 const estilosQR = {
     morado: {
         width: "",
         height: "",
         data: "",
         margin: 0,
         qrOptions: { typeNumber: "0", mode: "Byte", errorCorrectionLevel: "Q" },
         imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 13 },
         dotsOptions: { type: "square", color: "#000000" },
         backgroundOptions: { color: "rgba(255, 255, 255, 0)" },
         image: `data:image/png;base64,${logoBase64}`,
         cornersSquareOptions: { type: "square", color: "#c40d81" },
         cornersDotOptions: { type: "dot", color: "#c40d81" }
     },
     dots: {
        width: "",
        height: "",
        data: "",
        margin: 0,
        qrOptions: { typeNumber: "0", mode: "Byte", errorCorrectionLevel: "H" },
        imageOptions: { hideBackgroundDots: true, imageSize: 0.32, margin: 2 },
        dotsOptions: { type: "dots", color: "#000000",gradient:null },
        backgroundOptions: { color: "rgba(255, 255, 255, 0)" },
        image: `data:image/png;base64,${logoBase64}`,
        cornersSquareOptions: { type:  "extra-rounded", color: "#f46f10" },
        cornersDotOptions: { type: "dot", color: "#f46f10" }
    },
     square: {
         width: "",
         height: "",
         data: "",
         image: `data:image/png;base64,${logoBase64}`,
         dotsOptions: { color: "#000000", type: "square" },
         backgroundOptions: { color: "#ffffff" },
         imageOptions: { crossOrigin: "anonymous", margin: 20 }
     },
     hostdime: {
         width: "",
         height: "",
         data: "",
         margin: 0,
         qrOptions: { typeNumber: "0", mode: "Byte", errorCorrectionLevel: "Q" },
         imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 13 },
         dotsOptions: { type: "dots", color: "#f46f10"},
         backgroundOptions: { color: "rgb(255, 255, 254)" },
         image: `data:image/png;base64,${logoBase64}`,
         cornersSquareOptions: { type: "dot", color: "#f46f10" },
         cornersDotOptions: { type: "dot", color: "rgba(48, 119, 200, 0.71)"  }
     }
 };
 
 // Endpoint para generar el código QR
 app.post("/generar-qr", async (req, res) => {
     const { url, style, size,type } = req.body;
 
     if (!url || !style || !estilosQR[style] || !Wtype[type]) {
         return res.status(400).json({ error: "Parámetros inválidos." });
     }
 
     // Clonar el estilo seleccionado y establecer la URL
     const opcionesQR = { ...estilosQR[style], data: url, width: size,
         height: size,image: Wtype[type] };
 
     // Crear el QR
     const qrCode = new QRCodeStyling({ nodeCanvas, jsdom: JSDOM, ...opcionesQR });
 
     try {
         const buffer = await qrCode.getRawData(type); // Generar el QR en el tipo correcto
         res.setHeader("Content-Type", type === "svg" ? "image/svg+xml" : "image/png");
         res.send(buffer);
     } catch (error) {
         console.error("Error al generar el QR:", error);
         res.status(500).json({ error: "Error al generar el código QR." });
     }
 });
 
 // Iniciar el servidor
 app.listen(PORT, () => {
     console.log(`Servidor corriendo en http://localhost:${PORT}`);
 });
 
 
 