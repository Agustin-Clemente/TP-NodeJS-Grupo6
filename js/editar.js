
let id = document.getElementById("id");
let btnConsultar = document.getElementById("btnConsultar");
let btnEliminar = document.getElementById("eliminar");
let btnConfirmar = document.getElementById("confirmar");
//let nombre_destino = document.getElementById("nombre_destino");
let id_destino = document.getElementById("id_destino");
let duracion = document.getElementById("paquete.duracion");
//let disponible = document.getElementById("paquete.disponible");
let disponible = document.getElementsByName("paquete.disponible");
let precio = document.getElementById("paquete.precio");
let detalle = document.getElementById("paquete.detalle");
let descuento = document.getElementById("paquete.descuento");
let imagen = document.getElementById("paquete.imagen");
let formulario = document.getElementById("formulario");
let imagenProbando = document.getElementById("imagenProbando");


id.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Evitar que se envíe un formulario si hay uno
    btnConsultar.click();
  }
});




btnConsultar.addEventListener("click", () => {

  //fetch('http://localhost:3000/buscar/' + id.value)
  fetch('https://f89dace8-bdb0-4f64-bbaa-ae684cc2f25f-00-6map68f6l36u.worf.replit.dev/buscar/' + id.value)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data[0] == undefined) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El ID no existe",
          confirmButtonColor: "red",
        });
      }
      //id_destino.value = data[0].id_destino
      //nombre_destino.value = data[0].nombre_destino
      if (data[0].nombre_destino == "Catamarca") {
        id_destino.value = 1
      } if (data[0].nombre_destino == "San Juan") {
        id_destino.value = 2
      } if (data[0].nombre_destino == "Tucumán") {
        id_destino.value = 3
      }
      //id_destino.value = data[0].nombre_destino
      duracion.value = data[0].duracion
      //disponible.value = data[0].disponible

      for (const dispo of disponible) {
        if (dispo.value === data[0].disponible.toString()) {
          dispo.checked = true; // Marca el radio button correspondiente
          break;
        }
      }



      //disponible.value = data[0].disponible? "Si" : "No"
      precio.value = data[0].precio
      //detalle.value = data[0].detalle
      //descuento.value = data[0].descuento
      if (data[0].descuento == 10) {
        descuento.value = 1
      } if (data[0].descuento == 15) {
        descuento.value = 2
      } if (data[0].descuento == 20) {
        descuento.value = 3
      }
      if (data[0].descuento == 50) {
        descuento.value = 4
      }

    })
})



formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  let formData = new FormData();
  formData.append('id_destino', id_destino.value);
  //formData.append('nombre_destino', nombre_destino.value);
  formData.append('duracion', duracion.value);
  //formData.append('disponible', disponible.value== "Si" ? 1 : 2);
  for (const dispo of disponible) {
    if (dispo.checked) {
      formData.append('disponible', dispo.value)
      break
    }
  }

  formData.append('precio', precio.value);
  //formData.append('detalle', detalle.value);
  formData.append('id_promo', descuento.value);
  //formData.append('imagen', imagen.value);
  console.log(formData)


  const data = {};

  // Iterar sobre las entradas del FormData
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  // Convertir el objeto a JSON
  const jsonData = JSON.stringify(data);

  Swal.fire({
    title: "¿Quieres guardar los cambios?",
    showCancelButton: true,
    confirmButtonText: "Guardar",
    confirmButtonColor: "white",
    cancelButtonText: "Cancelar",
    cancelButtonColor: "#d33",
    customClass: {
      confirmButton: "custom-confirm-button"
    }
  }).then((result) => {
    if (result.isConfirmed) {
      //fetch('http://localhost:3000/editar/' + id.value, {
      fetch('https://f89dace8-bdb0-4f64-bbaa-ae684cc2f25f-00-6map68f6l36u.worf.replit.dev/editar/' + id.value, {
        method: 'PUT',
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
        title: "Paquete modificado exitosamente",
        confirmButtonText: "Continuar",
        confirmButtonColor: "white",
        customClass: {
          confirmButton: "custom-confirm-button"
        }
      })
    }
  });



});



btnEliminar.addEventListener("click", () => {
  Swal.fire({
    title: "¿Estas seguro/a que quieres eliminar este paquete?",
    text: "Esta acción no se podrá revertir",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "white",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
    customClass: {
      confirmButton: "custom-confirm-button"
    }
  }).then((result) => {
    if (result.isConfirmed) {
      //fetch('http://localhost:3000/baja/' + id.value, {
      fetch('https://f89dace8-bdb0-4f64-bbaa-ae684cc2f25f-00-6map68f6l36u.worf.replit.dev/baja/' + id.value, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          formulario.reset()
        })
      Swal.fire({
        title: "¡Eliminado!",
        text: "El paquete fue eliminado",
        confirmButtonColor: "red",
        icon: "success"
      });
    }
  });

});

function habilitar() {

  if (id_destino.value === '' || duracion.value === '' || disponible.value === '' || precio.value === '' || descuento.value === '') {
    btnConfirmar.disabled = true;
  } else {
    btnConfirmar.disabled = false;
  }
}

