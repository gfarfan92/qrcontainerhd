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
      qrInstance: null,  // para guardar la instancia QR
    };
  },

  mounted() {
    // Crear la instancia QR al montar el componente
    this.qrInstance = new QRCodeStyling({
      width: 150,
      height: 150,
      data: "https://www.hostdime.com.co/nebula-dc", // URL fija o dinamica si quieres
      image: "/images/hostdimelogo.png", // tu logo PNG para preview
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5,
        imageSize: 0.3,
      },
      dotsOptions: this.dotsOptions,
      cornersSquareOptions: this.cornersSquareOptions,
      cornersDotOptions: this.cornersDotOptions,
      backgroundOptions: this.backgroundOptions,
    });

    // Renderizar QR en el contenedor
    this.qrInstance.append(document.getElementById("qr-preview-create"));
  },

  watch: {
    // Cada vez que cambie cualquier opción, actualizamos el QR
    dotsOptions: {
      handler() {
        this.updateQR();
      },
      deep: true,
    },
    cornersSquareOptions: {
      handler() {
        this.updateQR();
      },
      deep: true,
    },
    cornersDotOptions: {
      handler() {
        this.updateQR();
      },
      deep: true,
    },
    backgroundOptions: {
      handler() {
        this.updateQR();
      },
      deep: true,
    },
  },

  methods: {
    updateQR() {
      if (!this.qrInstance) return;

      this.qrInstance.update({
        dotsOptions: this.dotsOptions,
        cornersSquareOptions: this.cornersSquareOptions,
        cornersDotOptions: this.cornersDotOptions,
        backgroundOptions: this.backgroundOptions,
      });
    },

    createQR() {
     
      fetch('/estilosqr/save-style', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        alert('Estilo guardado exitosamente ✅');
      })
      .catch(err => {
        alert('Error al guardar el estilo ❌');
      });
    },
  },
};

export default create;

