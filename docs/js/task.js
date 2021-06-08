
document.addEventListener("DOMContentLoaded", (event) => {

  const list = document.querySelector("#name");
  console.log(list.value)

  
});

document.addEventListener("DOMContentLoaded", (event) => {
  const test = document.querySelector("#test");
  test.innerHTML = "";
  database.collection("tareas").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      test.innerHTML += `${doc.data().nombre} <br>`;
    })
  })
});

const boton = document.querySelector("#myButton");

boton.addEventListener("click", () => {

    const name = document.querySelector("#name").value;

    database.collection("tareas").add({
        nombre: name
    })
    .then((docRef) => {
        console.log("Contacto añadido a la BD con ID: ", docRef.id);
    })
    .catch( (docRef) => {
        console.log("Error añadiendo contacto: ",error);
    })
});