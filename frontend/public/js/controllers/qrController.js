import qrModel from '../models/qrModel.js';

export default {
  data() {
    return qrModel;
  },
  methods: {
    async fetchStyles() {
      try {
        const response = await fetch("http://localhost:4021/api/estilos?cacheBuster=" + new Date().getTime());
        if (!response.ok) throw new Error("La respuesta no es OK");
        const data = await response.json();
        this.styles = data;
      } catch (error) {
        console.error("Error al obtener estilos:", error);
      }
    },
    async generarQR() {
      if (!this.url) return alert("Por favor, ingresa una URL válida.");

      const payload = {
        url: this.url,
        personalUrl: this.personalUrl,
        style: this.selectedStyle,
        size: parseInt(this.size),
        type: this.type
      };

      try {
        const response = await fetch("http://localhost:4021/api/generar-qr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        this.shortUrl = data.shortUrl;
        this.qrImage = data.qrImage;
      } catch (error) {
        console.error("Error:", error);
        alert("No se pudo generar el QR.");
      }
    },
    decodeSvg(qrImage) {
      if (!qrImage.startsWith("data:image/svg+xml;base64,")) {
        return qrImage;
      }
      const base64Data = qrImage.replace("data:image/svg+xml;base64,", "");
      return atob(base64Data);
    }
  },
  mounted() {
    this.fetchStyles();
    setInterval(this.fetchStyles, 50000);
  }
};
