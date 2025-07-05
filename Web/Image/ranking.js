document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los enlaces de las pestañas y todas las secciones de contenido
    const tabs = document.querySelectorAll('.category-sub-nav a');
    const sections = document.querySelectorAll('section.ranking-content');

    // Función para cambiar de pestaña
    function changeTab(tabId) {
        // Ocultar todas las secciones
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Quitar la clase 'active' de todas las pestañas
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });

        // Mostrar la sección correspondiente a la pestaña clicada
        const sectionToShow = document.querySelector(tabId);
        if (sectionToShow) {
            sectionToShow.classList.add('active');
        }

        // Añadir la clase 'active' a la pestaña clicada
        const tabToShow = document.querySelector(`a[href="${tabId}"]`);
        if (tabToShow) {
            tabToShow.classList.add('active');
        }
    }

    // Añadir un 'event listener' a cada pestaña
    tabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            event.preventDefault(); // Prevenir el comportamiento de salto del enlace
            const tabId = tab.getAttribute('href');
            changeTab(tabId);
        });
    });

    // Opcional: Mostrar la primera pestaña por defecto al cargar la página
    if(tabs.length > 0) {
       changeTab(tabs[0].getAttribute('href'));
    }
});