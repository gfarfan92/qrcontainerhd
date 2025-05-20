// C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\assets\js\app-generate.js
export default{


  methods: {
   async generarQR() {
      console.log("Generando QR...");
      if (!this.url) {
        alert('Por favor, ingresa una URL válida.');
        return;
      }

      const payload = {
        url: this.url,
        personalUrl: this.personalUrl,
        style: this.selectedStyle,
        size: parseInt(this.size, 10),
        type: this.type,
        customSlug: this.personalUrl
      };

      try {
        const res = await fetch('/qr/generadorqr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        console.log("Respuesta de la API:", data);
        if (!res.ok) throw new Error(data.error || 'Error generando el QR');

        this.shortUrl = data.shortUrl;
        this.qrImage = data.qrImage;
        const modal = new bootstrap.Modal(this.$refs.qrModal);
        modal.show();
      } catch (error) {
        console.error("❌ Error generando el QR", error);
      }
    },
  },
};

