const email = document.getElementById('email')
const contra = document.getElementById('contra')
const form = document.getElementById("form")
const errores = document.getElementById("warning")
const inicio = document.getElementById("inicio")

form.addEventListener("submit", e => {
    e.preventDefault();
    let warning = "";
    let error = false;
    // El texto siguiente valida el formato de un email.
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    errores.innerHTML = "";
    inicio.innerHTML = "";

    if (!regexEmail.test(email.value)) {
        warning += `Email inválido <br>`
        error = true;
    }
    if (contra.value.lenght<8 || contra.value == "") {
        warning += `Contraseña inválida <br>`
        error = true;
    }
    if (error) {
        errores.innerHTML = warning
    } else {
        inicio.innerHTML = "Sesión iniciada"
    }
})

