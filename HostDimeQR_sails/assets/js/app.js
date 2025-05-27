// C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\assets\js\app.js
import createQR from '/js/app-createqr.js';
import generarQR from '/js/app-generateqr.js';
import deleteStyle from '/js/app-deleteqr.js';
import stylesMixin from '/js/app-getstyles.js';
import generateutm from '/js/utm/app-utm.js';
import svg from '/js/svg/app-svg.js';


const app = Vue.createApp({
  mixins: [createQR,generarQR,deleteStyle,stylesMixin,generateutm,svg,],


  data() {
    return {
      styles: [],
      url: '',
      personalUrl: '',
      selectedStyle: 0,
      size: '300',
      type: 'png',
      shortUrl: '',
      qrImage: '',
      utm_source:'',
      utm_medium:'',
      utm_campaign:'',
      utm_term:'',
      utm_content:'',
      utmUrlGenerada:'',
    };
  },

  methods: {
    // 1) Obtener todos los estilos para poblar this.styles
   
    abrirSVGEnNuevaPestana() {
      if (!this.qrImage) return alert('No hay imagen para mostrar');

      // Restamos la parte base64, construimos un Blob y lo abrimos
      const base64Index = this.qrImage.indexOf('base64,');
      if (base64Index === -1) {
        alert('Formato de imagen no válido');
        return;
      }

      const base64Data = this.qrImage.substring(base64Index + 7);
      const mimeMatch = this.qrImage.match(/^data:(image\/svg\+xml|image\/png);base64,/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/svg+xml';
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    },

    

    
 
  },

  mounted() {
  // para mis estilos
  this.fetchStyles();

  //utm
  try {
    const params = new URLSearchParams(window.location.search);
    const utmK = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_term', 'utm_content'];
    const utms = {};
    for (const key of utmK) {
      const value = params.get(key);
      if (value) utms[key] = value;
    }

    if (Object.keys(utms).length === 0) return;

    document.querySelectorAll("a[href]").forEach((i) => {
      if (i.href.indexOf("http") !== -1) {
        let url = new URL(i.href);
        for (const [key, value] of Object.entries(utms)) {
          url.searchParams.set(key, value);
        }
        i.href = url.toString();
      }
    });
  } catch (e) {
    console.error("Error propagando parámetros UTM: ", e);
  }
}

});

app.mount('#app');
