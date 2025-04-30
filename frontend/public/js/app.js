import loginApp from '/js/app-login.js';

const app = Vue.createApp({
  mixins: [loginApp],
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
        const response = await fetch('/api-frontend/qr/estilos');
        if (!response.ok) throw new Error('Error al obtener estilos');
        this.styles = await response.json();
      } catch (err) {
        console.error(err);
      }
    },

    // Llama a POST /api-frontend/qr/generar-qr
    async generarQR() {
      if (!this.isLoggedIn) {
        alert('Por favor, inicia sesión para generar un QR.');
        return;
      }

      if (!this.url) {
        alert('Por favor, ingresa una URL válida.');
        return;
      }

      const payload = {
        url: this.url,
        personalUrl: this.personalUrl,
        style: this.selectedStyle,
        size: parseInt(this.size, 10),
        type: this.type
      };

      try {
        const res = await fetch('/api-frontend/qr/generar-qr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error generando el QR');
        this.shortUrl = data.shortUrl;
        this.qrImage  = data.qrImage;
      } catch (err) {
        console.error(err);
        alert('Error generando el QR.');
      }
    }
  },
  mounted() {
    this.fetchStyles();
  }
});

app.mount('#app');
