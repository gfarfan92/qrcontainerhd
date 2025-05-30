const QRCodeStyling = require('qr-code-styling-node');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

(async () => {
  const qr = new QRCodeStyling({
    width: 1200,
    height: 1200,
    data: "https://files.hostdime.com/",
    type: "svg",
    margin: 0,
    qrOptions: {
      errorCorrectionLevel: 'H',
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0,
      margin: 0,
    },
    dotsOptions: {
      type: 'dots',
      color: '#000',
    },
    backgroundOptions: {
      color: 'transparent',
    },
  });

  // Generar SVG
  const svgBuffer = await qr.getRawData('svg');
  const svgContent = svgBuffer.toString('utf-8');

  // Parsear SVG
  const dom = new JSDOM(svgContent, { contentType: "image/svg+xml" });
  const document = dom.window.document;
  const svg = document.querySelector('svg');

  // Crear y configurar el <image> con el logo (base64 ya proporcionado)
  const embeddedImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
  embeddedImage.setAttribute("x", "450");
  embeddedImage.setAttribute("y", "450");
  embeddedImage.setAttribute("width", "300");
  embeddedImage.setAttribute("height", "300");
  embeddedImage.setAttributeNS("http://www.w3.org/1999/xlink", "href", 
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0i..."); // tu base64 truncado por brevedad

  // Añadir el logo al SVG
  svg.appendChild(embeddedImage);

  // Guardar el SVG con logo en archivo
  const outputPath = path.join(__dirname, 'qr-con-logo.svg');
  fs.writeFileSync(outputPath, dom.serialize());

  console.log(`✅ QR con logo guardado en: ${outputPath}`);
})();
