// C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\assets\js\utm\app-utm.js
export default {


    methods: {
        async generateutm() {
            const data = {
                utm_source: this.utm_source,
                utm_medium: this.utm_medium,
                utm_campaign: this.utm_campaign,
                utm_term: this.utm_term,
                utm_content: this.utm_content,
                url: this.url,
            }

            try {

                const res = await fetch('/utm/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify( data )
                });
                const response = await res.json();

        console.log('UTM generado:', response.utmUrl);
        this.utmUrlGenerada = response.utmUrl;
        return response
        

      } catch (err) {
                console.error('no se genero url con utm:', err);
                alert(err.message || 'no se genero url con utm:');
            }
        }
    },
};
