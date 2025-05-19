// C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\assets\js\app-createqr.js
const create = {
  data() {
    return {
      styleName: '',
      dotsOptions: {
        color: '#000000',
        type: 'rounded',
      },
      cornersSquareOptions: {
        color: '#000000',
        type: 'square',
      },
      cornersDotOptions: {
        color: '#000000',
        type: 'square',
      },
      backgroundOptions: {
        color: '#ffffff',
      },
    };
  },

  methods: {
    createQR() {
      fetch('/estilosQR/save-style', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          styleName: this.styleName,
          dotsOptions: this.dotsOptions,
          cornersSquareOptions: this.cornersSquareOptions,
          cornersDotOptions: this.cornersDotOptions,
          backgroundOptions: this.backgroundOptions,
        }),
      })
        .then(res => {
          if (!res.ok) throw new Error('Error al guardar estilo');
          return res.json();
        })
        .then(data => {
          console.log('Estilo guardado correctamente:', data);
          alert('Estilo guardado exitosamente ✅');
          // Puedes redirigir si quieres:
          // window.location.href = '/otra-ruta';
        })
        .catch(err => {
          console.error('Error al guardar estilo:', err);
          alert('Error al guardar el estilo ❌');
        });
    },
  },
};

export default create;
