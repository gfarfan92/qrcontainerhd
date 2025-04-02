const fs = require("fs");
const path = require("path");

let logoBase64 = "";
try {
    logoBase64 = fs.readFileSync(path.join(__dirname, "../public/img/hostdimelogo.png"), { encoding: "base64" });
} catch (error) {
    console.error("Error al cargar el logo:", error);
}

const Wtype = {
    png: `data:image/png;base64,${logoBase64}`,
    svg: `data:image/svg+xml;base64,${logoBase64}`
};

const estilosQR = [
    {
        "width": "",
        "height": "",
        "data": "",
        "margin": 0,
        "qrOptions": { "typeNumber": "0", "mode": "Byte", "errorCorrectionLevel": "Q" },
        "imageOptions": { "hideBackgroundDots": true, "imageSize": 0.4, "margin": 13 },
        "dotsOptions": { "type": "square", "color": "#000000" },
        "backgroundOptions": { "color": "rgba(255, 255, 255, 0)" },
        "image": `data:image/png;base64,${logoBase64}`,
        "cornersSquareOptions": { "type": "square", "color": "#c40d81" },
        "cornersDotOptions": { "type": "dot", "color": "#c40d81" }
    },
    {
        "width": "",
        "height": "",
        "data": "",
        "margin": 0,
        "qrOptions": { "typeNumber": "0", "mode": "Byte", "errorCorrectionLevel": "H" },
        "imageOptions": { "hideBackgroundDots": true, "imageSize": 0.32, "margin": 2 },
        "dotsOptions": { "type": "dots", "color": "#000000", "gradient": null },
        "backgroundOptions": { "color": "rgba(255, 255, 255, 0)" },
        "image": `data:image/png;base64,${logoBase64}`,
        "cornersSquareOptions": { "type": "extra-rounded", "color": "#f46f10" },
        "cornersDotOptions": { "type": "dot", "color": "#f46f10" }
    },
    {
        "width": "",
        "height": "",
        "data": "",
        "image": `data:image/png;base64,${logoBase64}`,
        "dotsOptions": { "color": "#000000", "type": "square" },
        "backgroundOptions": { "color": "#ffffff" },
        "imageOptions": { "crossOrigin": "anonymous", "margin": 20 }
    },
    {
        "width": "",
        "height": "",
        "data": "",
        "margin": 0,
        "qrOptions": { "typeNumber": "0", "mode": "Byte", "errorCorrectionLevel": "Q" },
        "imageOptions": { "hideBackgroundDots": true, "imageSize": 0.4, "margin": 13 },
        "dotsOptions": { "type": "dots", "color": "#f46f10" },
        "backgroundOptions": { "color": "rgb(255, 255, 254)" },
        "image": `data:image/png;base64,${logoBase64}`,
        "cornersSquareOptions": { "type": "dot", "color": "#f46f10" },
        "cornersDotOptions": { "type": "dot", "color": "rgba(48, 119, 200, 0.71)" }
    },   {
        "width": "",
        "height": "",
        "data": "",
        "margin": 0,
        "qrOptions": { "typeNumber": "0", "mode": "Byte", "errorCorrectionLevel": "Q" },
        "imageOptions": { "hideBackgroundDots": true, "imageSize": 0.4, "margin": 13 },
        "dotsOptions": { "type": "square", "color": "#ff5544" },
        "backgroundOptions": { "color": "rgba(255, 255, 255, 0)" },
        "image": `data:image/png;base64,${logoBase64}`,
        "cornersSquareOptions": { "type": "square", "color": "#c4dd81" },
        "cornersDotOptions": { "type": "dot", "color": "#c40d81" }
    },
];

module.exports = { estilosQR, Wtype };
