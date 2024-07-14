let formulario = document.getElementById("formulario");
let id_destino = document.getElementById("id_destino");
let precio = document.getElementById("precio"); 
let duracion = document.getElementById("duracion");
//let disponible = document.getElementById("disponible");
let disponible = document.getElementsByName("paquete.disponible");

//let id_promo = document.getElementById("id_promo");
let descuento = document.getElementById("paquete.descuento");


formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    //let url = 'http://localhost:3000/alta/';
    let url = 'https://f89dace8-bdb0-4f64-bbaa-ae684cc2f25f-00-6map68f6l36u.worf.replit.dev/alta/';
    let formData = new FormData();

    formData.append('id_destino', id_destino.value);
    formData.append('precio', precio.value);
    formData.append('duracion', duracion.value);
    //formData.append('disponible', disponible.value);
    for (const dispo of disponible) {
        if (dispo.checked) {
        formData.append('disponible',dispo.value)
      break
        }
    }
    //formData.append('id_promo', id_promo.value);
  formData.append('id_promo', descuento.value);


    console.log(formData)
    const data = {};

// Iterar sobre las entradas del FormData
for (const [key, value] of formData.entries()) {
    data[key] = value;
}

// Convertir el objeto a JSON
const jsonData = JSON.stringify(data);

// Ahora puedes enviar jsonData al servidor
Swal.fire({
    title: "¿Quieres dar de alta a este paquete?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "white",
    cancelButtonColor: "#d33",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
    customClass: {
      confirmButton: "custom-confirm-button" }
  }).then((result) => {
    if (result.isConfirmed) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indica que estás enviando JSON
            },
            body: jsonData
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => {
              console.log('Success:', response);
              formulario.reset();
          });
      Swal.fire({
        title: "¡Paquete creado exitosamente!",
        icon: "success",
        confirmButtonColor: "white",
            customClass: {
              confirmButton: "custom-confirm-button" }
      });
    }
  });


    
});

document.getElementById("cancelar").addEventListener("click", () => formulario.reset()
);





