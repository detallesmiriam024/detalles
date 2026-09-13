// =========================
// CAMBIAR DE SECCIÓN
// =========================

// Todas las secciones de la página
const secciones = document.querySelectorAll(".seccion-pagina");

// Todos los elementos que tienen data-seccion
const botones = document.querySelectorAll("[data-seccion]");


// =========================
// MOSTRAR UNA SECCIÓN
// =========================

function mostrarSeccion(nombre) {

    // Ocultamos todas las secciones
    secciones.forEach((seccion) => {
        seccion.classList.remove("activa");
    });

    // Buscamos la sección que queremos mostrar
    const seccionElegida = document.getElementById(nombre);

    // Si existe, la mostramos
    if (seccionElegida) {
        seccionElegida.classList.add("activa");
    }
}


// =========================
// BOTONES DEL MENÚ Y CATEGORÍAS
// =========================

botones.forEach((boton) => {

    boton.addEventListener("click", () => {

        // Obtenemos el nombre de la sección
        const nombreSeccion = boton.getAttribute("data-seccion");

        // Mostramos esa sección
        if (nombreSeccion) {
            mostrarSeccion(nombreSeccion);
        }
    });

});


// =========================
// BOTÓN INICIO / LOGO
// =========================

const botonInicio = document.getElementById("boton-inicio");

if (botonInicio) {

    botonInicio.addEventListener("click", (evento) => {

        // Evita que el enlace recargue la página
        evento.preventDefault();

        // Volvemos a Inicio
        mostrarSeccion("inicio");
    });

}