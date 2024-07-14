
//fetch('http://localhost:3000/')
fetch('https://f89dace8-bdb0-4f64-bbaa-ae684cc2f25f-00-6map68f6l36u.worf.replit.dev/')
    .then(response => response.json())
    .then(data => mostrarPaquetes(data))
    .catch(error => console.log(error))

function mostrarPaquetes(paquetes) {
    let cardsContainer = document.getElementsByClassName("cards-container")
    let contenido = ""
    paquetes.forEach(paquete => {

        contenido = contenido +
            `<div data-aos="fade-up">
                <div class="Card">
                    <section>
                        <h3>${paquete.nombre_destino}</h3>
                        <h3>${paquete.id_paquete}</h3>
                        <img src="${paquete.imagen}"
                            alt="Imagen_Destino" />
                        <p><b class="precio">Precio regular:</b> <span class="precioReg">$${paquete.precio}</span></p>
                        <p><b class="precio">Precio con descuento:</b> $${(paquete.precio - (paquete.precio * paquete.descuento / 100)).toFixed(2)} <span class="desc"><b>${paquete.descuento}%</b></span></p>
                        <p><b class="precio">Duración:</b> ${paquete.duracion} hs</p>
                        <p><b class="precio">Disponible:</b> ${paquete.disponible ==1 ? "Si" : "No"}</p>
                        <p><b>Detalles:</b> ${paquete.detalle}</p>
                        <div class="btn-group">
                            <button type="button" class="btn btn-success" data-toggle="modal"
                                data-target="#exampleModal">
                                Comprar
                            </button>
                        </div>
                    </section>
                </div>
            </div>`

    console.log(paquete)
    console.log(contenido)
        
    });
    console.log(paquetes)
        console.log(cardsContainer)
        cardsContainer[0].innerHTML = contenido
    
}


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

