const express = require('express');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true })); // para formularios HTML
app.use(express.json()); // para solicitudes JSON (como fetch/Axios)


// ✅ Establecer EJS como motor de plantillas
app.set('view engine', 'ejs');

// ✅ Definir carpeta de vistas correctamente
app.set('views', path.join(__dirname, 'views'));

// ✅ Servir archivos estáticos como Bootstrap o JS
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Rutas
const qrRoutes = require('./routes/index');
app.use('/', qrRoutes);

app.listen(3000, () => {
  console.log('Frontend corriendo en http://localhost:3000');
});
