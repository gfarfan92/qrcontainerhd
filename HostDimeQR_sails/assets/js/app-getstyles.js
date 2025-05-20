// C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\assets\js\app-getstyles.js
export default {
 

  methods: {
  async fetchStyles() {
      try {
     
        const response = await fetch('/estilosqr/server-styles');
        if (!response.ok) throw new Error('Error al obtener estilos');

        const json = await response.json();
        this.styles = json.estilos || [];

        // Una vez que Vue haya renderizado el DOM (los divs qr-preview-{index}),
        // llamamos a renderizarPreviews para meter los QRCodeStyling en cada contenedor.
        this.$nextTick(() => {
          this.renderizarPreviews();
        });
      } catch (err) {
        console.error('fetchStyles:', err);
      }
    },


    renderizarPreviews() {
      // Verificamos que QRCodeStyling exista (viene de la UMD Browser que cargamos en layout)
      if (typeof QRCodeStyling !== 'function') {
        console.error('QRCodeStyling no está disponible');
        return;
      }

      this.styles.forEach((style, index) => {
        // Creamos una nueva instancia de QRCodeStyling para cada estilo
        const qr = new QRCodeStyling({
          width: 100,
          height: 100,
          data: "https://www.hostdime.com.co/nebula-dc",
          image: style.image || null,
          imageOptions: { crossOrigin: "anonymous" },
          dotsOptions: style.dotsOptions || {},
          cornersSquareOptions: style.cornersSquareOptions || {},
          cornersDotOptions: style.cornersDotOptions || {},
          backgroundOptions: style.backgroundOptions || {}
        });

        const elemento = document.getElementById(`qr-preview-${index}`);
        if (elemento) {
          // Limpiamos el contenedor (por si quedó algo) y luego agregamos el QR
          elemento.innerHTML = '';
          qr.append(elemento);
        }
      });
    },


  },
};


