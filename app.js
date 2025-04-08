// app.js

// Función para generar la imagen a partir del texto
function generateImage() {
  const text = document.getElementById('textInput').value;
  const outputDiv = document.getElementById('output');

  // Verifica que se haya ingresado texto
  if (!text) {
    outputDiv.innerHTML = "<p>Por favor, ingresa un texto.</p>";
    return;
  }

  // Muestra un mensaje mientras se genera la imagen
  outputDiv.innerHTML = `<h3>Generando imagen para: "${text}"...</h3>`;

  // Realiza una petición al endpoint del servidor que integra la API de generación de imágenes
  fetch('/api/generate-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: text })
  })
  .then(response => response.json())
  .then(data => {
    if (!data || !data.imageUrl) {
      outputDiv.innerHTML = '<p>No se pudo generar la imagen. Intenta más tarde.</p>';
      return;
    }
    
    // Crea el elemento de imagen con la URL obtenida
    const img = document.createElement('img');
    img.src = data.imageUrl;
    img.alt = 'Imagen generada';
    
    // Muestra la imagen en la página
    outputDiv.innerHTML = `<h3>Imagen generada para: "${text}"</h3>`;
    outputDiv.appendChild(img);
  })
  .catch(error => {
    console.error('Error generando imagen:', error);
    outputDiv.innerHTML = '<p>Error generando la imagen. Intenta más tarde.</p>';
  });
}