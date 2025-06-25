//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\assets\js\app-generateqr.js

export default {
  data() {
    return {
      blobUrl: '',

    };
  },
  methods: {
 createSvgBlob(dataUrl) {
  console.log('?? createSvgBlob recibió (50 chars):', dataUrl.slice(0, 50));

  const base64Index = dataUrl.indexOf('base64,');
  if (base64Index === -1) {
    console.error('? Formato de imagen no válido');
    return '';
  }

  const base64Data = dataUrl.substring(base64Index + 7);
  const mimeMatch = dataUrl.match(/^data:(image\/svg\+xml|image\/png);base64,/);
  const mimeType = mimeMatch ? mimeMatch[1] : 'image/svg+xml';

  try {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    const blobUrl = URL.createObjectURL(blob);
    console.log('? createSvgBlob ?', blobUrl);
    return blobUrl;
  } catch (e) {
    console.error('? Error al decodificar Base64:', e);
    return '';
  }
},



    async generarQR() {
      console.log("?? Iniciando proceso de generación de QR...");

      if (!this.url) {
        alert('? Por favor, ingresa una URL válida.');
        return;
      };
     
      // Paso 2: Usar esa URL para generar el QR
      const payload = {
        url: this.utmUrlGenerada,
        personalUrl: this.personalUrl,
        style: this.selectedStyle,
        size: parseInt(this.size, 10),
        type: this.type,
        short: this.shortSwitch ? 'on' : 'off',
        customSlug: this.personalUrl
      };

      try {
        const resQR = await fetch('/qr/generadorqr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const qrData = await resQR.json();

        if (!resQR.ok) {
          throw new Error(qrData.error || 'Error generando el código QR');
        }

        console.log("? QR generado con éxito:", qrData);
        this.shortUrl = qrData.shortUrl;
        this.qrImage = qrData.qrImage;

        // 2) Si es SVG, crea blobUrl
        if (this.type === 'svg') {
          this.blobUrl = this.createSvgBlob(this.qrImage);
        } else {
          this.blobUrl = '';
        }

        // 3) Forzar re-render y mostrar modal
        this.$nextTick(() => {
          if (!this.modalInstance) {
            this.modalInstance = new bootstrap.Modal(this.$refs.qrModal);
          }
          this.modalInstance.show();
        });
        

      } catch (err) {
        console.error("? generarQR:", err);
        alert(err.message);
      }
    }
  }
};
