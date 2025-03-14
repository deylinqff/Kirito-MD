async function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const status = document.getElementById("status");
    const link = document.getElementById("link");

    if (!fileInput.files.length) {
        status.textContent = "Selecciona un archivo primero.";
        return;
    }

    status.textContent = "Subiendo archivo...";
    link.innerHTML = "";

    const formData = new FormData();
    formData.append("image", fileInput.files[0]);

    try {
        const response = await axios.post('https://api.imgbb.com/1/upload?key=10604ee79e478b08aba6de5005e6c798', formData);

        if (response.data.success) {
            status.textContent = "✅ Archivo subido con éxito.";

            // Obtener la URL de la imagen
            const imageUrl = response.data.data.url;

            // Codificar la URL antes de enviarla
            const encodedUrl = encodeURIComponent(imageUrl);

            // Enviar la URL al backend para redirigirla correctamente
            const result = await axios.get(`https://kirito-md.vercel.app/imagen/${encodedUrl}`);

            if (result.status === 200) {
                link.innerHTML = `<a href="${result.data}" target="_blank">📂 Ver archivo</a>`;
            } else {
                status.textContent = "❌ Error al generar URL personalizada.";
            }
        } else {
            status.textContent = "❌ Error al subir archivo.";
        }
    } catch (error) {
        status.textContent = "❌ Error en la solicitud.";
    }
}