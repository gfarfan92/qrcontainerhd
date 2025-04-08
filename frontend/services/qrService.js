exports.obtenerEstilos = async (req, res) => {
  try {
    const response = await fetch("http://localhost:4021/api/estilos");

    if (!response.ok) {
      throw new Error("Error al obtener estilos del backend QR");
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error en obtenerEstilos:", err);
    res.status(500).json({ error: "No se lograron obtener los estilos desde QR HostDime" });
  }
};

exports.generarQR = async (req, res) => {
  const { url, personalUrl, style, size, type } = req.body;

  try {
    const response = await fetch("http://localhost:4021/api/generar-qr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, personalUrl, style, size, type })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error en generarQR:", err);
    res.status(500).json({ error: "No se logró generar el QR desde HostDime" });
  }
};
