import axios from 'axios';
import FormData from 'form-data';

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

        // Crear FormData para enviarlo a Catbox (sin userhash)
        const formData = new FormData();
        formData.append("reqtype", "fileupload");
        formData.append("fileToUpload", image);

        // Subir la imagen a Catbox de forma anónima
        const uploadResponse = await axios.post('https://catbox.moe/user/api.php', formData, {
            headers: formData.getHeaders(),
        });

        if (uploadResponse.status === 200) {
            const imageUrl = uploadResponse.data.trim(); // Catbox devuelve solo la URL

            return res.status(200).json({ success: true, imageUrl });
        } else {
            throw new Error('Error al subir la imagen a Catbox');
        }
    } catch (error) {
        console.error('Error en la API:', error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}