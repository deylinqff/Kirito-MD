// app.js

// Función para generar la imagen a partir del texto
function generateImage() {
  const text = document.getElementById('textInput').value;
  const outputDiv = document.getElementById('output');

  // Si el campo de texto está vacío, mostrar un mensaje
  if (!text) {
    outputDiv.innerHTML = "<p>Por favor, ingresa un texto.</p>";
    return;
  }

  // Mostrar un mensaje mientras se "genera" la imagen
  outputDiv.innerHTML = `<h3>Generando imagen para: "${text}"</h3>`;
  
  // Aquí es donde podrías integrar la lógica de IA en un caso real.
  // Como ejemplo, vamos a mostrar una imagen de un gato (simulación).
  const img = document.createElement('img');
  img.src = 'https://placekitten.com/500/500'; // Imagen de un gato como ejemplo
  img.alt = 'Imagen generada';
  outputDiv.appendChild(img);
}