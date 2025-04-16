const BACKEND_API = 'http://localhost:4021/api';


const app = Vue.createApp({
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

         // esta es la logica de mi login
    email: '',
    token: '',
    isLoggedIn: false,
    tokenSent: false,
    loginMessage: '' 
      };
    },
    methods: {
//logica login 
async solicitarToken() {
  if (!this.email) return alert("Por favor, ingresa un correo válido");
  try {
    const res = await fetch(`${BACKEND_API}/auth/solicitar-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: this.email })
    });

    let data;
    try { data = await res.json() }
    catch { throw new Error(`Server ${res.status}`) }

    if (res.ok) {
      this.tokenSent = true;
      this.loginMessage = "Token enviado. Revisa tu correo.";
    } else {
      this.loginMessage = data.message;
    }
  } catch (err) {
    console.error(err);
    this.loginMessage = "Error al solicitar token";
  }
},

async validarToken() {
  if (!this.token) return alert("Ingresa el token");
  try {
    const res = await fetch(`${BACKEND_API}/auth/validar-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: this.email, token: this.token })
    });
    let data;
    try { data = await res.json() }
    catch { throw new Error(`Server ${res.status}`) }
    
    if (res.ok) {
      this.isLoggedIn = true;
    } else {
      this.loginMessage = data.message;
    }
  } catch (err) {
    console.error(err);
    this.loginMessage = "Error al validar token";
  }
},
//logica qr
      
      async fetchStyles() {
        try {
          const response = await fetch("/api/estilos");
          if (!response.ok) throw new Error("Error al obtener estilos");
          this.styles = await response.json();
        } catch (err) {
          console.error(err);
        }
      },
  
      async generarQR() {
        if (!this.url) return alert("Por favor, ingresa una URL válida.");
        //carga util, y lo manejo para capturar los datos de vue
        const payload = {
          url: this.url,
          personalUrl: this.personalUrl,
          style: this.selectedStyle,
          size: parseInt(this.size),
          type: this.type
        };
  //si todo anda bien se la lanzo por puerto 3000 pa que routes/index me reciba y direccione el paquete
        try {
          const res = await fetch("/api/generar-qr", {


            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
  
          const data = await res.json();
          if (data.error) throw new Error(data.error);
          this.shortUrl = data.shortUrl;
          this.qrImage = data.qrImage;
        } catch (err) {
          console.error(err);
          alert("Error generando el QR.");
        }
      }
    },
    mounted() {
      this.fetchStyles();
    }
  });
  
  app.mount("#app");
  