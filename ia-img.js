const IMAGE_API_URL = "https://1yjs1yldj7.execute-api.us-east-1.amazonaws.com/default/ai_image?prompt=";

async function generarImagen(prompt) {
    try {
        const response = await fetch(IMAGE_API_URL + encodeURIComponent(prompt));
        const imageData = await response.json();
        return imageData.url || "No se pudo generar la imagen.";
    } catch (error) {
        console.error("Error al generar imagen:", error);
        return "Hubo un error al generar la imagen.";
    }
}

export { generarImagen };