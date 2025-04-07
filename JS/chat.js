import { obtenerRespuestaIA } from "api/ai.js";  // Asegúrate de que esta ruta sea correcta

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
        document.getElementById("user-input").value = ''; // Limpiar el campo de entrada

        appendMessage("👑 Escribiendo...", "bot"); // Indicador de que el bot está escribiendo

        try {
            const botResponse = await obtenerRespuestaIA(userInput);
            removeTypingIndicator();
            typeMessage(botResponse); // Añadido para la animación de escritura
        } catch (error) {
            removeTypingIndicator();
            appendMessage("Hubo un error al obtener la respuesta.", "bot");
        }
    }
}

function appendMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;  // Desplaza el chat hacia abajo
}

function removeTypingIndicator() {
    const chatBox = document.getElementById("chat-box");
    const messages = chatBox.getElementsByClassName("bot");
    if (messages.length > 0) {
        messages[messages.length - 1].remove(); // Elimina el indicador de "Escribiendo..."
    }
}

function typeMessage(message) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "bot");
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Desplaza el chat hacia abajo

    let i = 0;
    messageDiv.textContent = ''; // Inicializa el mensaje vacío
    const typingInterval = setInterval(() => {
        messageDiv.textContent += message[i];
        i++;
        if (i === message.length) {
            clearInterval(typingInterval); // Detener la animación al terminar
        }
    }, 50); // Ajusta la velocidad de escritura
}