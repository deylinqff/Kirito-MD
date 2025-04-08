import fetch from 'node-fetch';

const API_URL = "https://apis-starlights-team.koyeb.app/starlight/gemini?text=";

export default async function handler(req, res) {
    const { text } = req.query;

    if (!text) {
        return res.status(400).json({ error: 'Texto requerido para interactuar con Kirito-Bot IA' });
    }

    try {
        // Definir el "prompt" base con la personalidad de Kirito-Bot
        const promptBase = `
            Tu nombre es Kirito-Bot, fuiste creado por Deylin y solo hablas español. 
            Te gusta ser amigable, divertido y ayudar a los demás. 
            Solo mencionarás tu nombre, creador e idioma si alguien te pregunta por ello. 
            Responde de manera natural a las preguntas, pero solo da esta información si se te pregunta explícitamente.
        `;
        
        // Crear la consulta final con el mensaje del usuario
        const consultaIA = promptBase + " " + text;

        // Hacer la llamada a la API de Starlights Team
        const respuesta = await fetch(API_URL + encodeURIComponent(consultaIA));
        const data = await respuesta.json();

        if (!data || !data.result) {
            return res.status(500).json({ error: 'Error en la respuesta de la IA' });
        }

        // Devolver la respuesta de la IA
        res.status(200).json({ respuesta: data.result });

    } catch (error) {
        console.error("Error en la API de Kirito-Bot IA:", error);
        res.status(500).json({ error: 'Error interno del servidor', message: error.message });
    }
}