import { generarImagen } from "./ia-img.js"; // Importar la función de ia-img.js
import { obtenerRespuestaIA } from "./ai-api.js"; // Para obtener la respuesta de la IA

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
                const imagenUrl = await generarImagen(promptImagen); // Llamar a la función de ia-img.js
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

// Mostrar imágenes generadas por IA
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

// Agregar mensaje normal
function appendMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Eliminar el mensaje de "escribiendo..."
function removeTypingIndicator() {
    const chatBox = document.getElementById("chat-box");
    const messages = chatBox.getElementsByClassName("bot");
    if (messages.length > 0) {
        messages[messages.length - 1].remove();
    }
}

// Detectar si la respuesta contiene código
function containsCode(text) {
    return /```[\s\S]*?```/.test(text);
}

function extractCode(text) {
    const match = text.match(/```(?:\w*\n)?([\s\S]*?)```/);
    return match ? match[1].trim() : text;
}

// Mostrar mensaje con animación de escritura y detección de código
function typeMessage(message) {
    const chatBox = document.getElementById("chat-box");

    if (containsCode(message)) {
        const code = extractCode(message);
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", "bot");

        const codeBox = document.createElement("div");
        codeBox.classList.add("code-box");
        codeBox.innerHTML = `<pre><code>${code}</code></pre>`;

        messageDiv.appendChild(codeBox);
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    } else {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", "bot");
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        let i = 0;
        messageDiv.textContent = '';
        const typingInterval = setInterval(() => {
            messageDiv.textContent += message[i];
            i++;
            if (i === message.length) {
                clearInterval(typingInterval);
            }
        }, 50);
    }
}