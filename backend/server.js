

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
 
 app.use(express.static(path.join(__dirname, "../frontend")));//pa que tome mi ruta frontend
 app.use(express.json());
 app.use("/img", express.static(path.join(__dirname, "img")));
 
 
 
 
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

 app.post("/generar-qr", async (req, res) => {
    const { url, style, size, type, personalUrl } = req.body;

    // Validación básica de los parámetros
    if (!url || !style || !estilosQR[style] || !Wtype[type]) {
        return res.status(400).json({ error: "Parámetros inválidos." });
    }

    try {
        // Validación del alias personalizado
        let customSlug;//se debe utilizar customSlug para que funcione personalizar url en shlink
        if (personalUrl && personalUrl.trim() !== "") { //es para validar el campo en caso de ser llenado
            const slugRegex = /^[a-z0-9-_]+$/; // Solo minúsculas, números, guiones y guiones bajos
            customSlug = personalUrl.trim().toLowerCase();// me aseguro ya que es norma de shlink sacar url personalizada en minuscula para evitar conficto
        
            if (!slugRegex.test(customSlug)) {
                return res.status(400).json({
                    error: "Alias personalizado no válido. Usa solo letras minúsculas, números, '-' o '_'."
                });
            }
        }
        
        // Construir el cuerpo de la petición
        const bodyData = { longUrl: url };
        if (customSlug) {
            bodyData.customSlug = customSlug;
        }

        console.log("🔹 Cuerpo enviado a la API:", JSON.stringify(bodyData));

        // Hacer la petición a la API
        const shortenResponse = await fetch("https://qrlink.hostdi.me/rest/v3/short-urls", {
            method: "POST",
            headers: {
                "X-Api-Key": "7c24e07c7d1a-49a9-6465-937e-05e1f965",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
        });

        const shortenData = await shortenResponse.json();
        console.log("🔹 Respuesta completa de la API:", shortenData);

        if (!shortenResponse.ok) {
            throw new Error(shortenData.detail || "Error desconocido al acortar la URL");
        }

        const shortUrl = shortenData.shortUrl;

        // Aqui tomo todos los datos del script y los llamo de los estilos predeterminados
        const opcionesQR = {
            ...estilosQR[style],
            data: shortUrl,
            width: parseInt(size),
            height: parseInt(size),
            image: Wtype[type]
        };

        // Generar el código QR
        const qrCode = new QRCodeStyling({ nodeCanvas, jsdom: JSDOM, ...opcionesQR });
        const buffer = await qrCode.getRawData(type);

        // Respuesta final
        res.json({
            shortUrl,
            qrImage: `data:image/${type};base64,${buffer.toString("base64")}`
        });

    } catch (error) {
        console.error("⚠️ Error al procesar la solicitud:", error.message);
        res.status(500).json({ error: error.message || "Error al generar el código QR." });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});




