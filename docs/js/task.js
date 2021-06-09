const boton = document.querySelector("#myButton");

function reloadTaskView(){
  const taskView = document.querySelector("#tasksView")
  taskView.innerHTML = "";
  database.collection("tareas").get().then((querySnapshot) => {
    let content = ``;
    querySnapshot.forEach((doc) => {
      content += `<li><div class="collapsible-header"><i class="material-icons">filter_drama</i>${doc.data().nombre}</div>`;
      content += `<div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div></li>`;
    })
    taskView.innerHTML += content;
  })
};


function submitTasktoFirestore(){
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
}

document.addEventListener("DOMContentLoaded", (event) => {
  reloadTaskView();
});



boton.addEventListener("click", () => {
  submitTasktoFirestore();
  reloadTaskView();
});