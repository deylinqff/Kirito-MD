function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const currentLeft = sideMenu.style.left;
    
    if (currentLeft === '0px') {
        sideMenu.style.left = '-250px';  // Oculta el menú
    } else {
        sideMenu.style.left = '0px';  // Muestra el menú
    }
}