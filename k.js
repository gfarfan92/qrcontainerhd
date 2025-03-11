const styleOptions={

    dots :{
         width: 1200,
         height: 1200,
         data: url, // Usar la URL del usuario
         margin: 0,
         qrOptions: { typeNumber: "0", mode: "Byte", errorCorrectionLevel: "Q" },
         imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 13 },
         dotsOptions: { type: "square", color: "#000000" },
         backgroundOptions: { color: "rgba(255, 255, 255, 0)" },
         image: `data:hostdimelogo.png;base64,${logoBase64}`,
         cornersSquareOptions: { type: "square", color: "#c40d81" },
         cornersDotOptions: { type: "dot", color: "#c40d81" }
     },
 
 
     default : {
         "width": 200,
         "height": 200,
         "data": url,
         "margin": 0,
         "qrOptions": {
             "typeNumber": "0",
             "mode": "Byte",
             "errorCorrectionLevel": "H"
         },
         "imageOptions": {
             "hideBackgroundDots": true,
             "imageSize": 0.32,
             "margin": 2
         },
         "dotsOptions": {
             "type": "dots",
             "color": "#000000",
             "gradient": null
         },
         "backgroundOptions": {
             "color": "rgba(255, 255, 255, 0)"
         },
         image: `data:hostdimelogo.png;base64,${logoBase64}`,
  
         //"image": "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEzNC40IDEzNC40IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMzQuNCAxMzQuNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxwYXRoIGZpbGw9IiM3NDgyODYiIGQ9Ik02OS40LDE5LjZjLTAuOS0wLjMtMi40LTAuMy0zLjQsMEwxOC4zLDM2LjFjLTAuOSwwLjMtMS43LDEuNC0xLjcsMi40djEyLjZjMCwxLDAuOCwxLjcsMS44LDEuNWw0Ny42LTcuNwogIGMxLTAuMiwyLjUtMC4yLDMuNSwwbDQ3LjYsNy43YzEsMC4yLDEuOC0wLjUsMS44LTEuNVYzOC41YzAtMS0wLjgtMi0xLjctMi40TDY5LjQsMTkuNnoiPjwvcGF0aD4KPHBhdGggZmlsbD0iI0YzNzgyMSIgZD0iTTY5LjUsNTQuM2MtMS0wLjEtMi42LTAuMS0zLjUsMGwtNDcuNiw0LjRjLTEsMC4xLTEuOCwxLTEuOCwxLjl2MTIuNmMwLDEsMC44LDEuOSwxLjgsMS45bDQ3LjYsNC40CiAgYzEsMC4xLDIuNiwwLjEsMy41LDBsNDcuNi00LjRjMS0wLjEsMS44LTEsMS44LTEuOVY2MC42YzAtMS0wLjgtMS45LTEuOC0xLjlMNjkuNSw1NC4zeiI+PC9wYXRoPgo8cGF0aCBmaWxsPSIjNzQ4Mjg2IiBkPSJNNjkuNCw4OC45Yy0xLDAuMi0yLjUsMC4yLTMuNSwwbC00Ny42LTcuN2MtMS0wLjItMS44LDAuNS0xLjgsMS41djEyLjZjMCwxLDAuOCwyLDEuNywyLjRMNjYsMTE0LjMKICBjMC45LDAuMywyLjQsMC4zLDMuNCwwbDQ3LjctMTYuNWMwLjktMC4zLDEuNy0xLjQsMS43LTIuNFY4Mi44YzAtMS0wLjgtMS43LTEuOC0xLjVMNjkuNCw4OC45eiI+PC9wYXRoPgo8cGF0aCBmaWxsPSIjRjM3ODIxIiBkPSJNMS45LDQyLjVjMC0xLDAuOC0yLDEuNy0yLjRsOC4yLTIuOGMwLjktMC4zLDEuNywwLjIsMS43LDEuMnY1NS45YzAsMS0wLjgsMS41LTEuNywxLjJsLTguMi0yLjgKICBjLTAuOS0wLjMtMS43LTEuNC0xLjctMi40VjQyLjV6Ij48L3BhdGg+CjxwYXRoIGZpbGw9IiNGMzc4MjEiIGQ9Ik0xMzMuNSw0My41YzAtMS0wLjgtMi0xLjctMi40bC04LjItMi44Yy0wLjktMC4zLTEuNywwLjItMS43LDEuMnY1NC44YzAsMSwwLjgsMS41LDEuNywxLjJsOC4yLTIuOAogIGMwLjktMC4zLDEuNy0xLjQsMS43LTIuNFY0My41eiI+PC9wYXRoPgo8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzFfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjE2LjA3NDMiIHkxPSI5Ny44Nzg1IiB4Mj0iNjcuMTY5IiB5Mj0iOTcuODc4NSI+CiAgPHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojNzQ4Mjg2Ij48L3N0b3A+CiAgPHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojNTg2MzY2Ij48L3N0b3A+CjwvbGluZWFyR3JhZGllbnQ+CjxwYXRoIGRpc3BsYXk9Im5vbmUiIGZpbGw9InVybCgjU1ZHSURfMV8pIiBkPSJNNjcuMiw4OWMtMC42LDAtMS4zLDAtMS44LTAuMWwtNDcuNi03LjdjLTEtMC4yLTEuOCwwLjUtMS44LDEuNXYxMi42CiAgYzAsMSwwLjgsMiwxLjcsMi40bDQ3LjcsMTYuNWMwLjUsMC4yLDEuMSwwLjIsMS43LDAuMlY4OXoiPjwvcGF0aD4KPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8yXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIxNi4wNzQzIiB5MT0iNjYuOTI0NCIgeDI9IjY3LjE2OSIgeTI9IjY2LjkyNDQiPgogIDxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0YzNzgyMSI+PC9zdG9wPgogIDxzdG9wIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0NCNjUyOCI+PC9zdG9wPgo8L2xpbmVhckdyYWRpZW50Pgo8cGF0aCBkaXNwbGF5PSJub25lIiBmaWxsPSJ1cmwoI1NWR0lEXzJfKSIgZD0iTTY3LjIsNTQuMmMtMC42LDAtMS4zLDAtMS44LDAuMWwtNDcuNiw0LjRjLTEsMC4xLTEuOCwxLTEuOCwxLjl2MTIuNgogIGMwLDEsMC44LDEuOSwxLjgsMS45bDQ3LjYsNC40YzAuNSwwLDEuMSwwLjEsMS44LDAuMVY1NC4yeiI+PC9wYXRoPgo8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzNfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjE2LjA3NDMiIHkxPSIzNi4wMDIiIHgyPSI2Ny4xNjkiIHkyPSIzNi4wMDIiPgogIDxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6Izc0ODI4NiI+PC9zdG9wPgogIDxzdG9wIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6IzU4NjM2NiI+PC9zdG9wPgo8L2xpbmVhckdyYWRpZW50Pgo8cGF0aCBkaXNwbGF5PSJub25lIiBmaWxsPSJ1cmwoI1NWR0lEXzNfKSIgZD0iTTY3LjIsMTkuNGMtMC42LDAtMS4yLDAuMS0xLjcsMC4yTDE3LjgsMzYuMWMtMC45LDAuMy0xLjcsMS40LTEuNywyLjR2MTIuNgogIGMwLDEsMC44LDEuNywxLjgsMS41TDY1LjQsNDVjMC41LTAuMSwxLjEtMC4xLDEuOC0wLjFWMTkuNHoiPjwvcGF0aD4KPC9zdmc+",
         "dotsOptionsHelper": {
             "colorType": {
                 "single": true,
                 "gradient": false
             },
             "gradient": {
                 "linear": true,
                 "radial": false,
                 "color1": "#6a1a4c",
                 "color2": "#6a1a4c",
                 "rotation": "0"
             }
         },
         "cornersSquareOptions": {
             "type": "extra-rounded",
             "color": "#f46f10",
             "gradient": null
         },
         "cornersSquareOptionsHelper": {
             "colorType": {
                 "single": true,
                 "gradient": false
             },
             "gradient": {
                 "linear": true,
                 "radial": false,
                 "color1": "#000000",
                 "color2": "#000000",
                 "rotation": "0"
             }
         },
         "cornersDotOptions": {
             "type": "dot",
             "color": "#f46f10",
             "gradient": null
         },
         "cornersDotOptionsHelper": {
             "colorType": {
                 "single": true,
                 "gradient": false
             },
             "gradient": {
                 "linear": true,
                 "radial": false,
                 "color1": "#000000",
                 "color2": "#000000",
                 "rotation": "0"
             }
         },
         "backgroundOptionsHelper": {
             "colorType": {
                 "single": true,
                 "gradient": false
             },
             "gradient": {
                 "linear": true,
                 "radial": false,
                 "color1": "#ffffff",
                 "color2": "#ffffff",
                 "rotation": "0"
             }
         }
       },
       square: {
         dotsOptions: { type: "square", color: "#0000ff" },
         cornersSquareOptions: { type: "square", color: "#0000ff" },
     }};
 



     /*------------------------------------------------------------------------------*/ 


     // server.js
const express = require("express");
const cors = require("cors");
const { QRCodeStyling } = require("qr-code-styling/lib/qr-code-styling.common");
const nodeCanvas = require("canvas");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors({
    origin: "*",
    methods: "GET, POST, OPTIONS",
    allowedHeaders: "Content-Type"
}));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Leer el logo en Base64
let logoBase64;
try {
    logoBase64 = fs.readFileSync("hostdimelogo.png", { encoding: "base64" });
} catch (error) {
    console.error("Error: No se pudo leer el archivo del logo.", error);
}

// Estilos preconfigurados
const estilosQR = {
    default: {
        width: "",
        height: "",
        data: "",
        margin: 0,
        qrOptions: { typeNumber: "0", mode: "Byte", errorCorrectionLevel: "Q" },
        imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 13 },
        dotsOptions: { type: "square", color: "#000000" },
        backgroundOptions: { color: "rgba(255, 255, 255, 0)" },

        const Wtype :{image: `data:image/png;base64,${logoBase64}`, 
       image: `data:image/svg+xml;base64,${logoBase64}`} ,

        cornersSquareOptions: { type: "square", color: "#c40d81" },
        cornersDotOptions: { type: "dot", color: "#c40d81" }
    },
    dots: {
        "width": "",
        "height": "",
        "data": "",
        "margin": 0,
        "qrOptions": {
            "typeNumber": "0",
            "mode": "Byte",
            "errorCorrectionLevel": "H"
        },
        "imageOptions": {
            "hideBackgroundDots": true,
            "imageSize": 0.32,
            "margin": 2
        },
        "dotsOptions": {
            "type": "dots",
            "color": "#000000",
            "gradient": null
        },
        "backgroundOptions": {
            "color": "rgba(255, 255, 255, 0)"
        },
       const Wtype :{image: `data:image/png;base64,${logoBase64}`,
 
       image: `data:image/svg+xml;base64,${logoBase64}`} 

        "dotsOptionsHelper": {
            "colorType": {
                "single": true,
                "gradient": false
            },
            "gradient": {
                "linear": true,
                "radial": false,
                "color1": "#6a1a4c",
                "color2": "#6a1a4c",
                "rotation": "0"
            }
        },
        "cornersSquareOptions": {
            "type": "extra-rounded",
            "color": "#f46f10",
            "gradient": null
        },
        "cornersSquareOptionsHelper": {
            "colorType": {
                "single": true,
                "gradient": false
            },
            "gradient": {
                "linear": true,
                "radial": false,
                "color1": "#000000",
                "color2": "#000000",
                "rotation": "0"
            }
        },
        "cornersDotOptions": {
            "type": "dot",
            "color": "#f46f10",
            "gradient": null
        },
        "cornersDotOptionsHelper": {
            "colorType": {
                "single": true,
                "gradient": false
            },
            "gradient": {
                "linear": true,
                "radial": false,
                "color1": "#000000",
                "color2": "#000000",
                "rotation": "0"
            }
        },
        "backgroundOptionsHelper": {
            "colorType": {
                "single": true,
                "gradient": false
            },
            "gradient": {
                "linear": true,
                "radial": false,
                "color1": "#ffffff",
                "color2": "#ffffff",
                "rotation": "0"
            }
        }
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

    if (!url || !style || !estilosQR[style] || !Wtype[type] ) {
        return res.status(400).json({ error: "Parámetros inválidos." });
    }

    // Clonar el estilo seleccionado y establecer la URL
    const opcionesQR = { ...estilosQR[style], data: url, width: size,
        height: size,...Wtype[type]};

    // Crear el QR
    const qrCode = new QRCodeStyling({ nodeCanvas, jsdom: JSDOM, ...opcionesQR });

    try {
        const buffer = await qrCode.getRawData("png");
        res.setHeader("Content-Type", "image/png");
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


