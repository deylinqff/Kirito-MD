import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { text } = req.query;

    if (!text) {
        return res.status(400).json({ error: 'Texto requerido' });
    }

    try {
        // Llamar a la IA (Starlights Team)
        const response = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(text)}`);
        if (!response.ok) {
            throw new Error('Error en la conexión con la API de Starlights');
        }
        const data = await response.json();
        
        console.log('Respuesta de la API de Starlights:', data);  // Agregado para depuración

        // Verificar si la IA responde con el formato esperado
        if (!data || !data.response) {
            throw new Error('Error en la respuesta de la IA');
        }

        const textoRespuesta = data.response;

        // Usar un TTS externo (como Streamelements)
        const ttsResponse = await fetch(`https://api.streamelements.com/kappa/v2/speech?voice=Brian&text=${encodeURIComponent(textoRespuesta)}`);
        if (!ttsResponse.ok) {
            throw new Error('Error al generar el audio con TTS');
        }

        const audioBuffer = await ttsResponse.arrayBuffer();

        // Configurar los encabezados para devolver el archivo de audio
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Disposition', 'inline; filename="respuesta.mp3"');
        res.send(Buffer.from(audioBuffer));

    } catch (error) {
        console.error('Error en la API:', error);
        res.status(500).json({ error: 'Error interno del servidor', message: error.message });
    }
}