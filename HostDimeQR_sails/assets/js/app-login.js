//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\assets\js\app-login.js

const loginApp = {
  data() {
    return {
      email: '',
      token: '',
      isLoggedIn: window.isLoggedIn === true,  
      tokenSent: false,
      loginMessage: ''
    };
  },
  methods: {
    async verificarSesion() {
      const resp = await fetch('/session/check');
      const data = await resp.json();
      if (data.logeado) {
        this.isLoggedIn = true;
        this.email      = data.email;
        window.isLoggedIn = true; 
      } else {
        this.isLoggedIn = false;
        window.isLoggedIn = false;
      }
    },
    async solicitarToken() {
      const resp = await fetch('/token/get-token', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email: this.email })
      });
      const data = await resp.json();
      this.tokenSent    = resp.ok;
      this.loginMessage = data.message;
    },


    async validarToken() {
      const resp = await fetch('/token/validar', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email: this.email, token: this.token })
      });
      const data = await resp.json();
      if (resp.ok) {
        this.isLoggedIn = true;
        window.isLoggedIn = true; 
      }
      this.loginMessage = data.message;
    },
    async cerrarSesion() {
      await fetch('/session/logout', { method: 'POST' });
      this.isLoggedIn = false;
      window.isLoggedIn = false;
      this.email      = '';
      this.token      = '';
      this.tokenSent  = false;
      this.loginMessage = '';
    }
  },
  mounted() {
    this.verificarSesion();
  }
};

export default loginApp;
