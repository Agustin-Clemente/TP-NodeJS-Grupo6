function habilitar() {
    let nombre = document.getElementById("nombre");
    let email = document.getElementById("email");
    let mensaje = document.getElementById("mensaje");
    let destino = document.getElementById("destino");
    let botonEnviar = document.getElementById("enviar");
  
    if (nombre.value === '' || email.value === '' || mensaje.value === '' || destino.value === '') {
        botonEnviar.disabled = true;
    } else {
        botonEnviar.disabled = false;
    }
  }
