// C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\assets\js\app-deleteqr.js
export default {
   

  methods: {
     async deleteStyle(styleName) {
      if (!confirm(`¿Seguro que quieres eliminar "${styleName}"?`)) return;
      try {
       const res = await fetch('/estilosqr/delete-styles', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ styleName })  
    });
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



      
        this.styles = this.styles.filter(s => s.styleName !== styleName);
        this.$nextTick(() => {
       
          this.styles.forEach((_, idx) => {
            const el = document.getElementById(`qr-preview-${idx}`);
            if (el) el.innerHTML = '';
          });
        
          this.renderizarPreviews();
        });

        alert(`"${styleName}" eliminado correctamente.`);
      } catch (err) {
        console.error('deleteStyle:', err);
        alert(err.message || 'Error eliminando el estilo');
      }
    }
  },
};


