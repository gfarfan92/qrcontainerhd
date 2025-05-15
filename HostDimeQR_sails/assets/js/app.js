//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\assets\js\app.js
//import loginApp from '/js/app-login.js';

const app = Vue.createApp({
  //mixins: [loginApp],
  data() {
    return {
      styles: [],
      url: '',
      personalUrl: '',
      selectedStyle: 0,
      size: '300',
      type: 'png',
      shortUrl: '',
      qrImage: ''
    };
  },
  methods: {
    // Llama a GET /api-frontend/qr/estilos
    async fetchStyles() {
      try {
        const response = await fetch('/estilosqr/server-styles');
        if (!response.ok) throw new Error('Error al obtener estilos');
        this.styles = (await response.json()).estilos;
      } catch (err) {
        console.error(err);
      }
    },
   abrirSVGEnNuevaPestana() {
    if (!this.qrImage) return alert('No hay imagen para mostrar');

    // Si es PNG o SVG en base64, separar la parte base64
    const base64Index = this.qrImage.indexOf('base64,');
    if (base64Index === -1) {
      alert('Formato de imagen no válido');
      return;
    }

    // Extraemos el base64 puro
    const base64Data = this.qrImage.substring(base64Index + 7);
    
    // Detectar MIME (svg o png)
    const mimeMatch = this.qrImage.match(/^data:(image\/svg\+xml|image\/png);base64,/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/svg+xml'; // Por defecto SVG

    // Convertir base64 a byte array
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Crear Blob
    const blob = new Blob([byteArray], { type: mimeType });

    // Crear URL
    const blobUrl = URL.createObjectURL(blob);

    // Abrir en nueva pestaña
    window.open(blobUrl, '_blank');

    // Opcional: liberar la URL después de un rato
    setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
  },


    async generarQR() {

      console.log("Generando QR...");
      //if (!this.isLoggedIn) {
      //alert('Por favor, inicia sesión para generar un QR.');
      // return;
      //  }

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
    }
  },
  mounted() {
    this.fetchStyles();
  }
});

app.mount('#app');

