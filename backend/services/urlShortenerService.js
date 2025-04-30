async function shortenUrl(url, customSlug) {
  const bodyData = { longUrl: url };
  if (customSlug) {
    bodyData.customSlug = customSlug;
  }

  try {
    const response = await fetch("https://qrlink.hostdi.me/rest/v3/short-urls", {
      method: "POST",
      headers: {
        "X-Api-Key": "7c24e07c7d1a-49a9-6465-937e-05e1f965",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    });

    if (!response.ok) {
      throw new Error("Error al acortar la URL.");
    }

    const data = await response.json();
    return data.shortUrl;
  } catch (error) {
    throw new Error(error.message || "Error desconocido al acortar la URL");
  }
}

async function deleteSlug(customSlug) {
  try {
    const deleteResponse = await fetch(`https://qrlink.hostdi.me/rest/v3/short-urls/${customSlug}`, {
      method: "DELETE",
      headers: {
        "X-Api-Key": "7c24e07c7d1a-49a9-6465-937e-05e1f965",
        "Content-Type": "application/json"
      }
    });

    if (!deleteResponse.ok) {
      throw new Error("No se pudo eliminar el alias existente.");
    }

    console.log(`✅ Alias eliminado: ${customSlug}`);
  } catch (error) {
    console.error(`⚠️ Error al eliminar alias ${customSlug}:`, error.message);
  }
}

module.exports = { shortenUrl, deleteSlug };
