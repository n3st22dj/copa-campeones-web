// Seleccionamos todos los elementos que son preguntas
const questions = document.querySelectorAll(".faq-question");

// Recorremos cada pregunta para añadirle una funcionalidad
questions.forEach(question => {
    question.addEventListener("click", () => {
        // Al hacer clic, se añade o quita la clase 'active' para cambiar el estilo (ej: el ícono +/-)
        question.classList.toggle("active");

        // Seleccionamos el panel de la respuesta, que es el elemento hermano siguiente
        const answer = question.nextElementSibling;

        // Comprobamos si el panel de la respuesta ya está abierto (tiene un max-height)
        if (answer.style.maxHeight) {
            // Si está abierto, lo cerramos poniéndole null
            answer.style.maxHeight = null;
        } else {
            // Si está cerrado, lo abrimos. Le damos el alto necesario para que se vea todo el contenido.
            answer.style.maxHeight = answer.scrollHeight + "px";
        } 
    });
});