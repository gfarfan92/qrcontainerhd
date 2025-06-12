//C:\Users\GICOGERMANF\Pictures\GERMAN\codigo varios\qrbase\pruebas2.js

(async () => {
    const { QRCodeStyling } = require('@ckho/qr-code-styling/lib/qr-code-styling.common');
    const nodeCanvas = require("canvas");
    const { JSDOM } = require("jsdom");
    const fs = require("fs");
    const path = require("path");

    // Ruta al archivo SVG
    const logoPath = path.resolve(__dirname, "b.svg");

    // Lee el archivo SVG y conviértelo a base64
    const logoBuffer = fs.readFileSync(logoPath);
    const logoBase64 = `data:image/svg+xml;base64,${logoBuffer.toString("base64")}`;

    // Opciones del QR
    let options = {
        width: 1200,
        height: 1200,
        data: "https://hostdi.me/c/AG11?s=portafolio",
        margin: 0,
        qrOptions: {
            typeNumber: "0",
            mode: "Byte",
            errorCorrectionLevel: "Q"
        },
        imageOptions: {
            hideBackgroundDots: true,
            imageSize: 0.4,
            margin: 13
        },
        dotsOptions: {
            type: "square",
            color: "#000000"
        },
        backgroundOptions: {
            color: "rgba(255, 255, 255, 0)"
        },
        image: logoBase64 // se asigna correctamente aquí
    };

    // PNG
    const qrCodeImage = new QRCodeStyling({ nodeCanvas, ...options });
    const buffer = await qrCodeImage.getRawData("png");
    fs.writeFileSync("dataNFCQRAgnusPortafolio.png", buffer);

    // SVG
    const qrCodeSvg = new QRCodeStyling({ jsdom: JSDOM, type: "svg", ...options });
    const bufferSVG = await qrCodeSvg.getRawData("svg");
    fs.writeFileSync("test2.svg", bufferSVG);

    // SVG con imagen embebida (blob)
    const qrCodeSvgWithBlobImage = new QRCodeStyling({
        jsdom: JSDOM,
        nodeCanvas: nodeCanvas,
        type: "svg",
        ...options,
        imageOptions: {
            saveAsBlob: true,
            crossOrigin: "anonymous",
            margin: 20
        }
    });

    const bufferSVGBlog = await qrCodeSvgWithBlobImage.getRawData("svg");
    fs.writeFileSync("test3Blob.svg", bufferSVGBlog);

})();
