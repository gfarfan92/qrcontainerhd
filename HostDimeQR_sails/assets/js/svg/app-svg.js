export default {
  methods: {
    descargarSVGCrudo() {
      if (!this.qrImage || !this.qrImage.startsWith('data:image/svg+xml;base64,')) {
        alert('No es un SVG válido');
        return;
      }

      // 1. Extraer base64 y decodificar
      const base64 = this.qrImage.split(',')[1];
      const svgText = atob(base64);

      // ✅ 2. Usar TextEncoder para codificar correctamente como UTF-8
      const encoder = new TextEncoder();
      const svgUint8 = encoder.encode(svgText);
      const blob = new Blob([svgUint8], { type: 'image/svg+xml;charset=utf-8' });

      // 3. Descargar
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'hay-tienes-tu-qr-HOSTDIME.svg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }
};
