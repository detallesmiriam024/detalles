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

// =========================
// LIGHTBOX / ZOOM
// =========================

const imagenesProductos = document.querySelectorAll(
    ".imagen-producto img"
);

const lightbox = document.getElementById("lightbox");
const lightboxImagen = document.getElementById("lightbox-imagen");
const lightboxCerrar = document.getElementById("lightbox-cerrar");
const lightboxZoom = document.getElementById("lightbox-zoom");


// ABRIR IMAGEN

imagenesProductos.forEach((imagen) => {

    imagen.addEventListener("click", () => {

        lightboxImagen.src = imagen.src;
        lightboxImagen.alt = imagen.alt;

        zoomActivo = false;
        arrastrando = false;

        desplazamientoX = 0;
        desplazamientoY = 0;

        lightboxImagen.classList.remove("zoom-activo");

        lightboxImagen.style.transform =
            "translate3d(0px, 0px, 0) scale(1)";

        lightbox.classList.add("activo");

        document.body.style.overflow = "hidden";

    });

});


// SEGUNDO ZOOM

// =========================
// ZOOM CON ARRASTRE
// =========================

let zoomActivo = false;

let desplazamientoX = 0;
let desplazamientoY = 0;

let ultimaX = 0;
let ultimaY = 0;

let arrastrando = false;

const velocidadArrastre = 1.5;


function actualizarZoom() {

    if (zoomActivo) {

        lightboxImagen.style.transform =
            `translate3d(${desplazamientoX}px, ${desplazamientoY}px, 0) scale(2)`;

    } else {

        lightboxImagen.style.transform =
            "translate3d(0px, 0px, 0) scale(1)";

    }

}

lightboxZoom.addEventListener("click", (evento) => {

    evento.stopPropagation();

    zoomActivo = !zoomActivo;

    desplazamientoX = 0;
    desplazamientoY = 0;

    arrastrando = false;

    lightboxImagen.classList.toggle(
        "zoom-activo",
        zoomActivo
    );

    actualizarZoom();

});

lightboxImagen.addEventListener("dragstart", (evento) => {
    evento.preventDefault();
});

// =========================
// ARRASTRAR IMAGEN AMPLIADA
// =========================

lightboxImagen.addEventListener("pointerdown", (evento) => {

    if (!zoomActivo) return;

    evento.preventDefault();

    arrastrando = true;

    ultimaX = evento.clientX;
    ultimaY = evento.clientY;

});


document.addEventListener("pointermove", (evento) => {

    if (!zoomActivo || !arrastrando) return;

    evento.preventDefault();

    const movimientoX =
        (evento.clientX - ultimaX) * velocidadArrastre;

    const movimientoY =
        (evento.clientY - ultimaY) * velocidadArrastre;


    desplazamientoX += movimientoX;
    desplazamientoY += movimientoY;


    ultimaX = evento.clientX;
    ultimaY = evento.clientY;


    actualizarZoom();

});


document.addEventListener("pointerup", () => {

    arrastrando = false;

});


document.addEventListener("pointercancel", () => {

    arrastrando = false;

});


// CERRAR

function cerrarLightbox() {

    lightbox.classList.remove("activo");

    lightboxImagen.classList.remove("zoom-activo");

    zoomActivo = false;

    desplazamientoX = 0;
    desplazamientoY = 0;

    lightboxImagen.style.transform =
        "translate(0px, 0px) scale(1)";

    document.body.style.overflow = "";

}


// X

lightboxCerrar.addEventListener("click", (evento) => {

    evento.stopPropagation();

    cerrarLightbox();

});


// TOCAR EL FONDO OSCURO

lightbox.addEventListener("click", (evento) => {

    if (evento.target === lightbox) {
        cerrarLightbox();
    }

});


// ESC EN COMPUTADORA

document.addEventListener("keydown", (evento) => {

    if (evento.key === "Escape") {
        cerrarLightbox();
    }

});