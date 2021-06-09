const boton = document.querySelector("#myButton");
const loadingCSS = `<div class="preloader-wrapper small active">
<div class="spinner-layer spinner-green-only">
  <div class="circle-clipper left">
    <div class="circle"></div>
  </div><div class="gap-patch">
    <div class="circle"></div>
  </div><div class="circle-clipper right">
    <div class="circle"></div>
  </div>
</div>`

function reloadTaskView(){
  const taskView = document.querySelector("#tasksView")
  taskView.innerHTML = loadingCSS;
  database.collection("tareas").get().then((querySnapshot) => {
    let content = ``;
    querySnapshot.forEach((doc) => {
      content += `<li><div class="collapsible-header"><i class="material-icons">filter_drama</i>${doc.data().nombre}</div>`;
      content += `<div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div></li>`;
    })
    taskView.innerHTML = content;
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

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, options);
});


document.addEventListener("DOMContentLoaded", (event) => {
  reloadTaskView();
});



boton.addEventListener("click", () => {
  submitTasktoFirestore();
  reloadTaskView();
});