function habilitar() {
    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let dni = document.getElementById("dni");
    let destino = document.getElementById("destino");
    let cantidad = document.getElementById("cantidad");
    let pago = document.getElementById("pago");
    let botonPedir = document.getElementById("pedir");

    if (nombre.value === '' || apellido.value === '' || dni.value === '' || destino.value === '' || cantidad.value === '' || pago.value === '') {
        botonPedir.disabled = true;
    } else {
        botonPedir.disabled = false;
    }
}
