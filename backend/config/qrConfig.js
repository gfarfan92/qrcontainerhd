const fs = require("fs");
const path = require("path");

let logoBase64 = "";
try {
    logoBase64 = fs.readFileSync(path.join(__dirname, "../public/img/hostdimelogo.png"), { encoding: "base64" });
} catch (error) {
    console.error("Error al cargar el logo:", error);
}

const Wtype = {
    png: `data:image/png;base64,${logoBase64}`,
    svg: `data:image/svg+xml;base64,${logoBase64}`
};

let estilosQR = [];
try {
    const estilosData = fs.readFileSync(path.join(__dirname, "styles.json"), "utf-8");
    estilosQR = JSON.parse(estilosData);
    estilosQR = estilosQR.map(estilo => ({ ...estilo, image: Wtype.png }));
} catch (error) {
    console.error("Error al cargar estilos QR:", error);
}

module.exports = { estilosQR, Wtype };
