const email = document.getElementById('email')
const contra = document.getElementById('contra')
const form = document.getElementById("form")
const errores = document.getElementById("warning")
const inicio = document.getElementById("inicio")


const testUser = {
    id_login: 1,
    id_user: 1,
    username: "IzuKei",
    email: "izumikeiper@gmail.com",
    contraseña: "12345678"
};



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
    if (contra.value.lenght < 8 || contra.value == "") {
        warning += `Contraseña inválida <br>`
        error = true;
    }
    if (error) {
        errores.innerHTML = warning
    } else {
        inicio.innerHTML = "Sesión iniciada"
    }

    // Login con mail
    if (testUser.email == email.value) {
        // Encontró el email
        if (testUser.contraseña == contra.value) {
            // Password correcto
            initUser(testUser.id_user);
            location = "/index.html";
        } else {
            alert("Password incorrecto")
        }
    } else {
        // No encontró el email
        alert("Email inexistente")
    }
})


function initUser(userId){
    localStorage.setItem("isLogged", 1)
    localStorage.setItem("userId", userId);
}