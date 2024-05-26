function registrarse() {
    let nombre = document.getElementById('nombre');
    let apellido = document.getElementById('apellido');
    let email = document.getElementById('email');
    let contra = document.getElementById('contra');
    let contra2 = document.getElementById('contra2');
    const form = document.getElementById("form");
    const parrafo = document.getElementById("warning");
    const enviado = document.getElementById("registrado");
    const terminos = document.querySelector('label input:checked');
   
    form.addEventListener("submit", e=>{
        e.preventDefault();
        let warning = "";
        let error = false;
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        parrafo.innerHTML = "";
        enviado.innerHTML = "";

        if(nombre.value.length < 3){
            warning += `Nombre inválido <br>`
            error = true;
        }
        if(apellido.value.length < 2){
            warning+=`Apellido inválido <br>`
            error = true;
        }
        if(!regexEmail.test(email.value)){
            warning += `Email inválido <br>`
            error = true;
        }
        if(contra.value.length<8){
            warning += `Contraseña inválida <br>`
            error = true;
        }
        if(contra2.value !== contra.value){
            warning += `La contraseña no coincide <br>`
            error = true;
        }
        if(terminos<1){
            warning += `Debe aceptar los Términos y Condiciones <br>`
            error = true;
        }
        if(error){
            parrafo.innerHTML = warning
        }else{
            enviado.innerHTML = "Formulario enviado"
        }
    })
}