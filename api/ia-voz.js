import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { prompt } = req.query;

    if (!prompt) {
        return res.status(400).json({ error: 'Texto requerido para generar la imagen' });
    }

    try {
        // Aquí se hace la solicitud a la API de OpenAI (DALL·E 2)
        const openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`  // Reemplaza con tu API key
            },
            body: JSON.stringify({
                prompt: prompt,
                n: 1,  // Número de imágenes a generar
                size: '1024x1024'  // Tamaño de la imagen
            })
        });

        const data = await openaiResponse.json();

        if (!openaiResponse.ok) {
            throw new Error('Error en la solicitud a OpenAI');
        }

        // Verificamos que haya una URL de la imagen
        if (!data || !data.data || !data.data[0].url) {
            return res.status(500).json({ error: 'No se pudo generar la imagen' });
        }

        const imageUrl = data.data[0].url;

        // Devolvemos la URL de la imagen generada
        res.status(200).json({ imageUrl: imageUrl });

    } catch (error) {
        console.error('Error al generar la imagen:', error);
        res.status(500).json({ error: 'Error interno del servidor', message: error.message });
    }
}