function toggleSideMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const menuIcon = document.getElementById('menu-icon');
    
    const currentLeft = sideMenu.style.left;
    
    if (currentLeft === '0px') {
        sideMenu.style.left = '-250px';  // Ocultar el menú
        menuIcon.innerHTML = '&#9776;';  // Volver al ícono de menú
    } else {
        sideMenu.style.left = '0px';  // Mostrar el menú
        menuIcon.innerHTML = '&#10006;';  // Cambiar al ícono de "X"
    }
}