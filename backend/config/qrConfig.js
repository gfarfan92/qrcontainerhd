const fs = require("fs");
const path = require("path");

const rutaEstilos = path.join(__dirname, "styles.json");
const rutaLogo = path.join(__dirname, "../public/img/hostdimelogo.png");

let estilosQR = [];

try {
    delete require.cache[require.resolve(rutaEstilos)];
    const estilosData = fs.readFileSync(rutaEstilos, "utf-8");
    estilosQR = JSON.parse(estilosData);
    // Aquí puedes añadir cualquier lógica adicional necesaria
} catch (error) {
    console.error("Error al cargar estilos QR:", error);
} 


let Wtype = {};

// Función para cargar el logo
function cargarLogo() {
    try {
        const logoBase64 = fs.readFileSync(rutaLogo, { encoding: "base64" });
        Wtype = {
            png: `data:image/png;base64,${logoBase64}`,
            svg: `data:image/svg+xml;base64,${logoBase64}`
        };
    } catch (error) {
        console.error("Error al cargar el logo:", error);
        Wtype = {
            png: null,
            svg: null
        };
    }
}

// Función para cargar estilos desde styles.json
function cargarEstilos() {
    try {
        console.log("📦 Recargando estilos desde styles.json...");
        const data = fs.readFileSync(rutaEstilos, "utf8");
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


// Cargar el logo y los estilos inicialmente
cargarLogo();
cargarEstilos();

// Observar cambios en styles.json y recargar estilos dinámicamente
fs.watchFile(rutaEstilos, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
        console.log("Detectado cambio en styles.json. Recargando estilos...");
        cargarEstilos();
    }
});

// Al final del archivo qrConfig.js

function obtenerEstilosQR() {
    return estilosQR;
}

module.exports = {
    obtenerEstilosQR,
    estilosQR,
    Wtype
};




