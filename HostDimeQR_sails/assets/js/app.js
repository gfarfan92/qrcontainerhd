// assets/js/app.js
import createQR from '/js/app-createqr.js';

const app = Vue.createApp({
  mixins: [createQR],

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
    // 1) Obtener todos los estilos para poblar this.styles
    async fetchStyles() {
      try {
        // NOTA: fíjate que la URL coincide exactamente con la ruta en config/routes.js
        // por ejemplo: GET /estilosQR/server-styles → action: 'estilosqr/get-styles'
        const response = await fetch('/estilosQR/server-styles');
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

    // ─── 2) Dibujar el preview de cada estilo ───
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

    // 4) Eliminar un estilo llamando al endpoint DELETE
    async deleteStyle(styleName) {
      if (!confirm(`¿Seguro que quieres eliminar "${styleName}"?`)) return;
      try {
        const res = await fetch(
          `/estilosqr/delete-styles/${encodeURIComponent(styleName)}`,
          {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
          }
        );
        if (!res.ok) {
          const contentType = res.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errData = await res.json();
            throw new Error(errData.message || 'Error eliminando estilo');
          } else {
            const text = await res.text();
            throw new Error(`Respuesta inesperada: ${text}`);
          }
        }



        // Si todo salió ok, removemos el estilo del arreglo local y volvemos a dibujar previews
        this.styles = this.styles.filter(s => s.styleName !== styleName);
        this.$nextTick(() => {
          // Limpiamos previamente los contenedores de preview viejos
          this.styles.forEach((_, idx) => {
            const el = document.getElementById(`qr-preview-${idx}`);
            if (el) el.innerHTML = '';
          });
          // Volvemos a generar previews con la lista actualizada
          this.renderizarPreviews();
        });

        alert(`"${styleName}" eliminado correctamente.`);
      } catch (err) {
        console.error('deleteStyle:', err);
        alert(err.message || 'Error eliminando el estilo');
      }
    }
  },

  mounted() {
    // Al montarse el componente, solicitamos todos los estilos
    this.fetchStyles();
  }
});

app.mount('#app');
