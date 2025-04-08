import fetch from 'node-fetch';
import { Readable } from 'stream';

export default async function handler(req, res) {
    const { text } = req.query;

    if (!text) {
        return res.status(400).json({ error: 'Texto requerido' });
    }

    try {
        // Llamar a la IA
        const response = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(text)}`);
        const data = await response.json();

        if (!data || !data.response) {
            return res.status(500).json({ error: 'Error en la respuesta de la IA' });
        }

        const textoRespuesta = data.response;

        // Usar un TTS externo (como gTTS API, ElevenLabs, o Google Cloud TTS)
        const ttsResponse = await fetch(`https://api.streamelements.com/kappa/v2/speech?voice=Brian&text=${encodeURIComponent(textoRespuesta)}`);
        const audioBuffer = await ttsResponse.arrayBuffer();

        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Disposition', 'inline; filename="respuesta.mp3"');
        res.send(Buffer.from(audioBuffer));

    } catch (error) {
        console.error('Error en la API:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}