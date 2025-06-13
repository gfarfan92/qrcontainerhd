// C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\assets\js\utm\app-utm.js

export default {
  data() {
    return {
      url: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: ''
    };
  },

  computed: {
    utmUrlGenerada() {
      if (!this.url) return '';
      const params = [];
      if (this.utm_source)   params.push(`utm_source=${encodeURIComponent(this.utm_source)}`);
      if (this.utm_medium)   params.push(`utm_medium=${encodeURIComponent(this.utm_medium)}`);
      if (this.utm_campaign) params.push(`utm_campaign=${encodeURIComponent(this.utm_campaign)}`);
      if (this.utm_term)     params.push(`utm_term=${encodeURIComponent(this.utm_term)}`);
      if (this.utm_content)  params.push(`utm_content=${encodeURIComponent(this.utm_content)}`);
      // Si no hay params, devolvemos la URL original
      if (!params.length) return this.url;
      // Añadimos ? o & según ya tenga query o no
      const separator = this.url.includes('?') ? '&' : '?';
      return `${this.url}${separator}${params.join('&')}`;
    }
  }
};
