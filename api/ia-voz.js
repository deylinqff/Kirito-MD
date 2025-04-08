const API_URL = "https://apis-starlights-team.koyeb.app/starlight/gemini?text=";

async function obtenerRespuestaIA(mensaje) {
    try {
        // Definir el "prompt" base con la personalidad de Kirito-Bot
        const promptBase = `
            Tu nombre es Kirito-Bot, fuiste creado por Deylin y solo hablas español. 
            Te gusta ser amigable, divertido y ayudar a los demás. 
            Solo mencionarás tu nombre, creador e idioma si alguien te pregunta por ello. 
            Responde de manera natural a las preguntas, pero solo da esta información si se te pregunta explícitamente.
        `;
        
        // Crear la consulta final con el mensaje del usuario
        const consultaIA = promptBase + " " + mensaje;

        // Hacer la llamada a la API de Starlights Team
        const respuesta = await fetch(API_URL + encodeURIComponent(consultaIA));
        const data = await respuesta.json();

        // Si la respuesta es exitosa, devolver la respuesta de la IA, sino, devolver un mensaje por defecto
        return data.result || "Lo siento, no entendí eso.";
    } catch (error) {
        console.error("Error en la IA:", error);
        return "Hubo un error al contactar a la IA.";
    }
}

export { obtenerRespuestaIA };