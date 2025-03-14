import axios from 'axios';

export default async function handler(req, res) {
    try {
        // Hacemos una solicitud GET a la URL de Kirito
        const response = await axios.get('https://kirito-md.vercel.app/file.html');

        // Aquí podrías agregar lógica para procesar o modificar la respuesta si es necesario
        // Ejemplo: Si quieres obtener algo específico de la página HTML
        const data = response.data;

        // Retornar la respuesta de la página a quien hace la solicitud
        res.status(200).json({
            success: true,
            message: 'Conexión exitosa con Kirito MD',
            data: data, // Aquí tienes el HTML de la página
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Hubo un error al interactuar con la página.',
            error: error.message,
        });
    }
}