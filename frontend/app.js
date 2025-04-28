// frontend/app.js
const express = require('express');
const path = require('path');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const loginRoutes = require('./routes/index'); 
const qrRoutes = require('./routes/qrRoutes'); 
const viewRoutes = require('./routes/viewRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

// 1. Sesiones
app.use(session({
  secret: 'hostdime-s3cr3t',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 10 * 60 * 1000 }
}));

// 2. Parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// 3. EJS + Layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// 4. Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// 5. Rutas
app.use('/', viewRoutes);
app.use('/api-frontend/login', loginRoutes);
app.use('/api-frontend/qr', qrRoutes);  

// Agrega esto antes de levantar el servidor
app.get('/', (req, res) => {
  res.render('home');  // Asegúrate que tengas un archivo frontend/views/home.ejs
});


// 6. Levantar servidor UNA vez, al final
app.listen(PORT, () => {
  console.log(`🔥🔥🔥 Frontend corriendo en http://localhost:${PORT} 🔥🔥🔥`);
});
