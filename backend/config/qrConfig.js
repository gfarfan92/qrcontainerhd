const fs = require("fs");
const { RUTA_LOGO, RUTA_ESTILOS } = require("./config");
//aqui voy a empezar a guardar todos mis estilos en un array, esta es mi canastica
let estilosQR = [];
let Wtype = {};

function cargarLogo() {
  try {
    const logoBase64 = fs.readFileSync(RUTA_LOGO, { encoding: "base64" });
    Wtype = {
      png: `data:image/png;base64,${logoBase64}`,
      svg: `data:image/svg+xml;base64,${logoBase64}`
    };
  } catch (error) {
    console.error("Error al cargar el logo:", error);
    Wtype = { png: null, svg: null };
  }
}
// esto es para mantener el .json(RUTA_ESTILOS) actualizado
function cargarEstilos() {
  try {
    console.log("📦 Recargando estilos desde styles.json...");
    const data = fs.readFileSync(RUTA_ESTILOS, "utf8");
    const estilos = JSON.parse(data);
    estilosQR = estilos.map(estilo => ({
      ...estilo,
      image: Wtype.png
    }));
    console.log("✅ Estilos cargados exitosamente.");
  } catch (error) {
    console.error("❌ Error al cargar estilos QR:", error);
    estilosQR = [];
  }
}

cargarLogo();
cargarEstilos();

fs.watchFile(RUTA_ESTILOS, (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    console.log("Detectado cambio en styles.json. Recargando estilos...");
    cargarEstilos();
  }
});
//aqui tomo mi canastica y empaqueto para enviar a qrcontroller.js, esta parte es buena para mantener separada la logica y no afectar mis estilos azctuales
function obtenerEstilosQR() {
  return estilosQR;
}

module.exports = {
  obtenerEstilosQR,
  Wtype
};
