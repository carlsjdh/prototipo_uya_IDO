const boton = document.querySelector("#buttonSendtask");
const botonAddTask = document.querySelector("#buttonAddTask");
const botonDeleteTask = document.querySelector("#buttonDeleteTask");
const botonSendDeleteTask = document.querySelector("#buttonSendDeleteTask");

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



function reloadDeleteTaskView(){
  const formDeleteTask = document.querySelector("#formDeleteTask")
  formDeleteTask.innerHTML = loadingCSS;
  database.collection("tareas").get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      formDeleteTask.innerHTML = "No hay tareas";
    } else {
      var content = '';
      querySnapshot.forEach((doc) => {
        content += `<p><label><input type="checkbox" value="${doc.data().nombre}"/><span>${doc.data().nombre}</span></label></p>`;
      })
      content += `</form>`
      formDeleteTask.innerHTML = content;      
    }

  })
};



function reloadTaskView(){
  const today = Date.now()
  const taskView = document.querySelector("#tasksView")
  taskView.innerHTML = loadingCSS;
  database.collection("tareas").get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      taskView.innerHTML = "No hay tareas";
    } else {
      var content = '';
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
          if(Difference_In_Days == 1) {
            Difference_In_Days = "Queda " + Difference_In_Days + " día"
          } else {
            Difference_In_Days = "Quedan " + Difference_In_Days + " días"
          }
        }

        var taskName = doc.data().nombre;
        content += `<li>
                      <div class="collapsible-header" aria-label="${taskName}">
                        <i class="material-icons">forum</i>
                        <span id="task_${taskName}" tabindex="0">${taskName} - ${Difference_In_Days}</span>
                      </div>`;
        content += `  <div class="collapsible-body">  
                        <div class="section">
                          <h6 tabindex="0">Descripción:</h6>
                          <p tabindex="0">${doc.data().descripcion}</p>
                        </div>  <div class="section">
                        <h6 tabindex="0">Fecha de finalización:</h6>
                        <p tabindex="0">${doc.data().fecha}</p>
                      </div>
                    </li>`;
      })
      taskView.innerHTML = content;  
    }

  })
};



function submitTasktoFirestore(){
  
  const name = document.querySelector("#taskName").value;
  const description = document.querySelector("#descriptionTask").value;
  const date = document.querySelector("#dateTask").value;
  if ( name == '' || description == '' || date == ''){
    alert("Hay campos vacíos")
  } else {
    database.collection("tareas").doc(`${name}`).set({
      nombre: name,
      descripcion: description,
      fecha: date
    })
    .then((docRef) => {
      $("#modalAdd").modal('close');
      M.toast({html: 'Tarea añadida correctamente!'})
      
      reloadTaskView();
    })
    .catch( (docRef) => {
      M.toast({html: 'Error añadiendo la tarea'})
        console.log("Error añadiendo contacto: ", docRef);
    })
  }
}


document.addEventListener("DOMContentLoaded", (event) => {
  reloadTaskView();
});



boton.addEventListener("click", () => {
  submitTasktoFirestore();
});

botonDeleteTask.addEventListener("click", () => {
  reloadDeleteTaskView();
})

botonSendDeleteTask.addEventListener("click", () => {
  var names = [];
  $('input[type=checkbox]:checked').each(function(_ , item) {
      names.push(item.value);
  });

  if(names.length == 0) {
    console.log(names.length)
    alert("No ha seleccionado tareas")
  }
  
  names.forEach((name) => {
    var Problems = false;
    database.collection("tareas").doc(name).delete().then(() => {
      console.log("Document successfully deleted!");
      $("#modalDelete").modal('close');
      M.toast({html: `Eliminado correctamente ${name}`})
    }).catch((error) => {
        Problems = true;
        console.error("Error removing document: ", error);
    });

  })
  reloadTaskView();
})