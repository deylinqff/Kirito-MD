import { obtenerRespuestaIA } from "./ai-api.js";

// El URL de la API para generar imágenes
const API_IMAGEN_URL = "https://api.agungny.my.id/api/text2img?prompt=";

document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (userInput) {
        appendMessage(userInput, "user");
        document.getElementById("user-input").value = '';

        appendMessage("👑 Escribiendo...", "bot");

        // Verificar si el mensaje comienza con "generar imagen"
        if (userInput.toLowerCase().startsWith("generar imagen")) {
            const promptImagen = userInput.substring(15).trim(); // Obtener el texto después de "generar imagen"
            try {
                const imagenUrl = await generarImagen(promptImagen);
                removeTypingIndicator();
                appendImage(imagenUrl);
            } catch (error) {
                removeTypingIndicator();
                appendMessage("Hubo un error al generar la imagen.", "bot");
            }
        } else {
            try {
                const botResponse = await obtenerRespuestaIA(userInput);
                removeTypingIndicator();
                typeMessage(botResponse);
            } catch (error) {
                removeTypingIndicator();
                appendMessage("Hubo un error al obtener la respuesta.", "bot");
            }
        }
    }
}

// Función para generar la imagen usando la API
async function generarImagen(prompt) {
    const response = await fetch(API_IMAGEN_URL + encodeURIComponent(prompt));
    const data = await response.json();
    return data.imageUrl; // Suponiendo que la respuesta tiene una propiedad 'imageUrl'
}

// Función para mostrar la imagen generada en el chat
function appendImage(imageUrl) {
    const chatBox = document.getElementById("chat-box");
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("message", "bot");
    const imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    imageElement.alt = "Imagen generada por IA";
    imageDiv.appendChild(imageElement);
    chatBox.appendChild(imageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function appendMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingIndicator() {
    const chatBox = document.getElementById("chat-box");
    const messages = chatBox.getElementsByClassName("bot");
    if (messages.length > 0) {
        messages[messages.length - 1].remove();
    }
}

function typeMessage(message) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "bot");
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    let i = 0;
    messageDiv.textContent = ''; // Inicializa el mensaje vacío
    const typingInterval = setInterval(() => {
        messageDiv.textContent += message[i];
        i++;
        if (i === message.length) {
            clearInterval(typingInterval);
        }
    }, 50); // Ajusta la velocidad de escritura
}