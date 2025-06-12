//C:\Users\GICOGERMANF\Pictures\GERMAN\codigo varios\qrbase\qrbase.js

(async () => {
    const { QRCodeStyling } = require('@ckho/qr-code-styling/lib/qr-code-styling.common');
    const nodeCanvas = require("canvas");
    const { JSDOM } = require("jsdom");
    const fs = require("fs");

    //AGNUS
    let options = {
        "width": 1200, "height": 1200,
        "data": "https://hostdi.me/c/AG11?s=portafolio", "margin": 0, "qrOptions": { 
            "typeNumber": "0", "mode": "Byte", "errorCorrectionLevel": "Q" },
             "imageOptions": { 
                "hideBackgroundDots": true, "imageSize": 0.4, "margin": 13 }, "dotsOptions": { "type": "square", "color": "#000000" },
        "backgroundOptions": { "color": "rgba(255, 255, 255, 0)" },
"image":hostdime.svg    }

    // For canvas type
    const qrCodeImage = new QRCodeStyling({ nodeCanvas, /*this is required */ ...options });
    buffer = await qrCodeImage.getRawData("png");
    fs.writeFileSync("dataNFCQRAgnusPortafolio.png", buffer);

    // For svg type
    const qrCodeSvg = new QRCodeStyling({ jsdom: JSDOM, /* this is required */ type: "svg", ...options });
    bufferSVG = await qrCodeSvg.getRawData("svg");
    fs.writeFileSync("test2.svg", bufferSVG);

    // For svg type with the inner-image saved as a blob
    // (inner-image will render in more places but file will be larger)
    const qrCodeSvgWithBlobImage = new QRCodeStyling({
        jsdom: JSDOM, // this is required
        nodeCanvas, // this is required
        type: "svg",
        ...options,
        imageOptions: {
            saveAsBlob: true,
            crossOrigin: "anonymous",
            margin: 20
        }
    });

    bufferSVGBlog = await qrCodeSvgWithBlobImage.getRawData("svg");
    fs.writeFileSync("test3Blob.svg", bufferSVGBlog);


})()