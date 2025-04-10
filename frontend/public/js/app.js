const app = Vue.createApp({
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
      async fetchStyles() {
        try {
          const response = await fetch("/api/estilos");
          if (!response.ok) throw new Error("Error al obtener estilos");
          this.styles = await response.json();
        } catch (err) {
          console.error(err);
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
          const res = await fetch("/api/generar-qr", {


            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
  
          const data = await res.json();
          if (data.error) throw new Error(data.error);
          this.shortUrl = data.shortUrl;
          this.qrImage = data.qrImage;
        } catch (err) {
          console.error(err);
          alert("Error generando el QR.");
        }
      }
    },
    mounted() {
      this.fetchStyles();
    }
  });
  
  app.mount("#app");
  