// backend/server.js
const express = require('express');
const cors    = require('cors');
const session = require('express-session');
const nocache = require('nocache');
const qrRoutes    = require('./routes/qrRoutes');
const bloginRoutes = require('./routes/bloginRoutes');
const { DIRECTORIO_PUBLICO, DIRECTORIO_IMAGENES } = require('./config/config');

const app = express();
const PORT = process.env.PORT || 4021;

app.use(nocache());
app.use(cors({ origin: '*', methods: 'GET,POST,OPTIONS', allowedHeaders: 'Content-Type' }));
app.use(express.json());
app.use(session({
  secret: 'clave-super-secreta',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 10 * 60 * 1000 }
}));


app.use('/api-backend', qrRoutes);  
app.use('/api-backend/login', bloginRoutes);
// Estáticos
app.use(express.static(DIRECTORIO_PUBLICO));
app.use('/img', express.static(DIRECTORIO_IMAGENES));

app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});
