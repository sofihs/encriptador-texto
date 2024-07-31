//-------Selección de Elementos-------//
const btnEncriptar = document.querySelector(".btn-encriptar");
const txtEncriptar = document.querySelector(".encriptar");
const aviso = document.querySelector(".texto-aviso");
const respuesta = document.querySelector(".evaluar");
const contenido = document.querySelector(".tarjeta-contenedor");
const btnCopiar = document.querySelector(".btn-copiar");
const btnDesencriptar = document.querySelector(".btn-desencriptar");
const botonBorrar = document.getElementById("botonborrar");
const imgMuñeco = document.querySelector(".img-muñeco");
const textoUno = document.querySelector(".texto-uno");
const textoDos = document.querySelector(".texto-dos");
const btnToggleMode = document.querySelector('.btn-toggle-mode');
const modeIcon = document.querySelector('#mode-icon');

// Mostrar aviso
const mostrarAviso = (mensaje, color) => {
    aviso.style.background = color;
    aviso.style.color = "#FFFF";
    aviso.style.fontWeight = "800";
    aviso.textContent = mensaje;
    setTimeout(() => {
        aviso.removeAttribute("style");
    }, 1500);
};

// Normalizar texto
const normalizarTexto = texto => texto.normalize("NFD").replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]>\<:";,\u0300-\u036f']/g, "");

// Verificar texto
const verificarTexto = texto => {
    if (texto === "") {
        mostrarAviso("El campo de texto no debe estar vacío", "#0A3871");
        return false;
    }
    if (texto !== normalizarTexto(texto)) {
        mostrarAviso("No debe tener acentos y caracteres especiales", "#0A3871");
        return false;
    }
    if (texto !== texto.toLowerCase()) {
        mostrarAviso("El texto debe ser todo en minúscula", "#0A3871");
        return false;
    }
    return true;
};

// Función para encriptar texto
const encriptarTexto = e => {
    e.preventDefault();
    let texto = txtEncriptar.value;
    if (!verificarTexto(texto)) return;
    
    texto = texto.replace(/e/g, "enter")
                 .replace(/i/g, "imes")
                 .replace(/a/g, "ai")
                 .replace(/o/g, "ober")
                 .replace(/u/g, "ufat");
    respuesta.textContent = texto;
    btnCopiar.style.visibility = "visible";
    contenido.style.display = 'none';
};

// Función para desencriptar texto
const desencriptarTexto = e => {
    e.preventDefault();
    let texto = txtEncriptar.value;
    txtEncriptar.value = ''; // Limpia el campo de entrada después de desencriptar
    if (!verificarTexto(texto)) return;
    
    texto = texto.replace(/enter/g, "e")
                 .replace(/imes/g, "i")
                 .replace(/ai/g, "a")
                 .replace(/ober/g, "o")
                 .replace(/ufat/g, "u");
    respuesta.textContent = texto;
    btnCopiar.style.visibility = "visible";
    contenido.style.display = 'none';
};

// Función para copiar el texto al portapapeles
const copiarTexto = () => {
    const texto = respuesta.textContent;
    navigator.clipboard.writeText(texto)
        .then(() => mostrarAviso("Texto copiado", "#0A3871"))
        .catch(() => mostrarAviso("Error al copiar el texto", "#FF0000"));
};

// Función para restablecer la vista inicial
const restablecerVistaInicial = () => {
    txtEncriptar.value = "";
    respuesta.textContent = "";
    btnCopiar.style.visibility = "hidden";
    contenido.style.display = 'block';
    
    // Restaurar contenido original
    contenido.innerHTML = `
        <img src="img/muñeco.png" alt="Muñeco" class="img-muñeco"/>
        <div class="texto-aviso">Ningún mensaje fue encontrado</div>
        <p class="texto-uno">Ingresa el texto que deseas encriptar o desencriptar.</p>
    `;
    
    // Aplicar o quitar la clase dark-mode
    const elements = [document.body, imgMuñeco, textoUno, textoDos];
    elements.forEach(el => {
        el.classList.toggle('dark-mode', document.body.classList.contains('dark-mode'));
    });
};

// Alternar modo oscuro
const alternarModoOscuro = () => {
    document.body.classList.toggle('dark-mode');
    btnToggleMode.classList.toggle('dark-mode');
    modeIcon.classList.toggle('dark-mode');

    // Cambiar el ícono según el modo
    modeIcon.src = document.body.classList.contains('dark-mode') 
        ? './img/dark-mode.png' 
        : './img/dark-mode.png';
};

//-------Botones-------//
btnEncriptar.addEventListener("click", encriptarTexto);
btnDesencriptar.addEventListener("click", desencriptarTexto);
botonBorrar.addEventListener("click", e => {
    e.preventDefault();
    restablecerVistaInicial();
});
btnCopiar.addEventListener("click", copiarTexto);
btnToggleMode.addEventListener('click', alternarModoOscuro);
