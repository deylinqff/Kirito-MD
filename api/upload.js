import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Método no permitido' });
    }

    try {
        // Recibir el archivo desde la petición
        const { image } = req.body;
        if (!image) {
            throw new Error('No se recibió ninguna imagen');
        }

        // Crear FormData para enviarlo a la página
        const formData = new FormData();
        formData.append("image", image);

        // Subir la imagen a file.html (usando imgbb en este caso)
        const uploadResponse = await axios.post('https://api.imgbb.com/1/upload?key=10604ee79e478b08aba6de5005e6c798', formData);

        if (uploadResponse.data.success) {
            const imageUrl = uploadResponse.data.data.url;

            return res.status(200).json({ success: true, imageUrl });
        } else {
            throw new Error('Error al subir la imagen');
        }
    } catch (error) {
        console.error('Error en la API:', error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}