export default {
  data() {
    return {
      blobUrl: '',
      errcustom: ''
    };
  },
  methods: {
    async generarQR() {
      console.log("🔄 Generando QR...");
      this.errcustom = '';

      if (!this.url) {
        alert('❗ URL requerida.');
        return;
      }

      const payload = {
        url: this.utmUrlGenerada,
        personalUrl: this.personalUrl,
        style: this.selectedStyle,
        size: parseInt(this.size, 10),
        type: this.type,
        short: this.shortSwitch ? "true" : "false",
        customSlug: this.personalUrl
      };

      try {
        console.log("prueba");
        const resQR = await fetch('/qr/generadorqr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        console.log("prueba2");

        const qrData = await resQR.json();

        if (!qrData.success) {
          this.errcustom = qrData.errcustom || 'errorDesconocido';
          return;
        }

        this.shortUrl = qrData.shortUrl;
        this.qrImage = qrData.qrImage;

        if (this.type === 'svg') {
          this.blobUrl = this.createSvgBlob(this.qrImage);
        } else {
          this.blobUrl = '';
        }

        this.$nextTick(() => {
          if (!this.modalInstance) {
            this.modalInstance = new bootstrap.Modal(this.$refs.qrModal);
          }
          this.modalInstance.show();
        });

      } catch (err) {
        console.log("prueba4");
        console.error("❌ generarQR:", err);

        this.errcustom = 'falloApi';
      }
    },

    createSvgBlob(dataUrl) {
      const base64Index = dataUrl.indexOf('base64,');
      if (base64Index === -1) return '';
      const base64Data = dataUrl.substring(base64Index + 7);
      const byteCharacters = atob(base64Data);
      const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);
      const mimeMatch = dataUrl.match(/^data:(image\/svg\+xml|image\/png);base64,/);
      return URL.createObjectURL(new Blob([byteArray], { type: mimeMatch ? mimeMatch[1] : 'image/svg+xml' }));
    }
  }
};
