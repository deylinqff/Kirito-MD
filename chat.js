document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    // Mostrar mensaje del usuario
    displayMessage(userInput, 'user');

    // Limpiar el campo de texto
    document.getElementById("user-input").value = "";

    // Mostrar mensaje de IA (esperando respuesta)
    displayMessage("Escribiendo...", 'ai', true);

    // Llamar a la API de IA
    fetchAIResponse(userInput);
}

function displayMessage(message, sender, isTyping = false) {
    const messagesContainer = document.getElementById("messages");

    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender);
    if (isTyping) messageDiv.classList.add('typing');
    messageDiv.innerHTML = message;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function fetchAIResponse(userMessage) {
    const response = await fetch("URL_DE_TU_API_DE_IA", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message: userMessage,
        }),
    });

    const data = await response.json();
    const aiMessage = data.reply || "Lo siento, no pude entenderlo.";

    // Actualizar el mensaje de IA
    const messagesContainer = document.getElementById("messages");
    const lastMessage = messagesContainer.lastElementChild;

    // Eliminar "Escribiendo..." y mostrar respuesta de IA
    if (lastMessage && lastMessage.classList.contains('ai') && lastMessage.classList.contains('typing')) {
        lastMessage.remove();
    }

    displayMessage(aiMessage, 'ai');
}