//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\assets\js\app.js
//import loginApp from '/js/app-login.js';

const app = Vue.createApp({
//  mixins: [loginApp],
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

    
   
    async generarQR(){

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
         customSlug:  this.personalUrl 
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
        this.qrImage  = data.qrImage;
        
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

