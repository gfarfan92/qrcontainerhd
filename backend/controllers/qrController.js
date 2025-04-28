const { generarQRCode } = require("../services/qrService");
const { shortenUrl, deleteSlug } = require("../services/urlShortenerService");

async function generarQR(req, res) {
  try {
    const { url, style, size, type, personalUrl } = req.body;

    let customSlug;
    if (personalUrl && personalUrl.trim() !== "") {
      customSlug = personalUrl.trim().toLowerCase();
      await deleteSlug(customSlug);
    }

    const shortUrl = await shortenUrl(url, customSlug);
    const qrData = await generarQRCode(shortUrl, style, size, type, customSlug);

    res.json({
      shortUrl,
      qrImage: qrData.qrImage
    });
  } catch (error) {
    console.error("⚠️ Error al procesar la solicitud:", error.message);
    res.status(500).json({ error: error.message || "Error al generar el código QR." });
  }
}

module.exports = { generarQR };

