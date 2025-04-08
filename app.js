document.getElementById('image-form').addEventListener('submit', async function(event) {
    event.preventDefault();  // Evita que el formulario recargue la página
    const textInput = document.getElementById('text-input').value.trim();

    if (!textInput) {
        alert('Por favor, ingresa una descripción.');
        return;
    }

    // Mostrar mensaje de carga
    document.getElementById('loading-message').style.display = 'block';
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('image-container').style.display = 'none';

    try {
        // Solicitar la imagen a la API
        const response = await fetch(`https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${encodeURIComponent(textInput)}`);
        
        if (!response.ok) throw new Error('No se pudo generar la imagen.');

        const buffer = await response.arrayBuffer();  // Obtener la imagen en buffer
        const blob = new Blob([buffer], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);  // Crear URL para mostrar la imagen

        // Mostrar la imagen en la página
        const imageElement = document.getElementById('generated-image');
        imageElement.src = imageUrl;
        
        document.getElementById('loading-message').style.display = 'none';
        document.getElementById('image-container').style.display = 'block';

    } catch (error) {
        // Manejar errores si la API no responde correctamente
        console.error('Error:', error);
        document.getElementById('loading-message').style.display = 'none';
        document.getElementById('error-message').style.display = 'block';
    }
});