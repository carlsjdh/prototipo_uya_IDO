const boton = document.querySelector("#buttonAddtask");
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
  const today = Date.now()
  console.log(today)
  const taskView = document.querySelector("#tasksView")
  taskView.innerHTML = loadingCSS;
  database.collection("tareas").get().then((querySnapshot) => {
    let content = ``;
    querySnapshot.forEach((doc) => {
      var date1 = new Date(doc.data().fecha);
      console.log(date1.getTime());
      // To calculate the time difference of two dates
      var Difference_In_Time = date1.getTime() - today;
        
      // To calculate the no. of days between two dates
      var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
      console.log(Difference_In_Days)
      content += `<li><div class="collapsible-header"><i class="material-icons">filter_drama</i>${doc.data().nombre} - Quedan ${Difference_In_Days} días</div>`;
      content += `<div class="collapsible-body">  <div class="section">
      <h5>Descripcion:</h5>
      <p>${doc.data().descripcion}</p>
    </div>  <div class="section">
    <h5>Fecha de finalización</h5>
    <p>${doc.data().fecha}</p>
  </div></div></li>`;
    })
    taskView.innerHTML = content;
  })
};


function submitTasktoFirestore(){
  const name = document.querySelector("#taskName").value;
  const description = document.querySelector("#descriptionTask").value;
  const date = document.querySelector("#dateTask").value;
  database.collection("tareas").add({
    nombre: name,
    descripcion: description,
    fecha: date
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