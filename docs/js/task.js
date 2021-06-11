const boton = document.querySelector("#buttonAddtask");
const loadingCSS = 
  `<div class="preloader-wrapper small active">
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

      // Days left to end the task
      var date1 = new Date(doc.data().fecha);
      // To calculate the time difference of two dates
      var Difference_In_Time = date1.getTime() - today;
      // To calculate the no. of days between two dates
      var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
      if(Difference_In_Days <= 0) {
        Difference_In_Days = "Finalizado"
      } else {
        Difference_In_Days = "Quedan " + Difference_In_Days + " días"
      }
      content += `<li tabindex="0"><div class="collapsible-header" tabindex="0"><i class="material-icons" tabindex="0">forum</i>${doc.data().nombre} - ${Difference_In_Days}</div>`;
      content += `<div class="collapsible-body" tabindex="0">  <div class="section">
      <h6 tabindex="0">Descripción:</h6>
      <p>${doc.data().descripcion}</p>
      </div>  <div class="section">
      <h6>Fecha de finalización:</h6>
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
  if ( name == '' || description == '' || date == ''){
    alert("Hay campos vacíos")
  } else {
    database.collection("tareas").add({
      nombre: name,
      descripcion: description,
      fecha: date
    })
    .then((docRef) => {
      $("#modalAdd").modal('close');
      M.toast({html: 'Tarea añadida correctamente!'})
      console.log("Contacto añadido a la BD con ID: ", docRef.id);
      reloadTaskView();
    })
    .catch( (docRef) => {
      M.toast({html: 'Error añadiendo la tarea'})
        console.log("Error añadiendo contacto: ");
    })
  }
}


document.addEventListener("DOMContentLoaded", (event) => {
  reloadTaskView();
});



boton.addEventListener("click", () => {
  submitTasktoFirestore();
});