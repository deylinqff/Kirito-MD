import axios from 'axios';

export default async function handler(req, res) {
    try {
        const url = 'https://kirito-md.vercel.app/file.html';

        // Realizamos la petición GET a la URL
        const response = await axios.get(url);

        // Verificamos si la respuesta es válida
        if (!response || !response.data) {
            throw new Error("La respuesta de la URL es inválida.");
        }

        res.status(200).json({
            success: true,
            message: 'Conexión exitosa con Kirito MD',
            html: response.data, // Esto devuelve el HTML de la página
        });

    } catch (error) {
        console.error("Error en la API:", error.message);
        res.status(500).json({
            success: false,
            message: 'Error al interactuar con la página.',
            error: error.message,
        });
    }
}