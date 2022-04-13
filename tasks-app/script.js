const btnForm = document.getElementById("formTask");
const title = document.getElementById("title");
const description = document.getElementById("description");
const tasksElement = document.getElementById("tasks");

//*Fuctions
function saveTask(e) {
  e.preventDefault();
 
  let titleValue = title.value;
  let descriptionValue = description.value;

 const task ={
    titleValue,
    descriptionValue
 }

 if (localStorage.getItem('tasks')=== null) {
     let tasks =[]
     tasks.push(task)
     localStorage.setItem('tasks', JSON.stringify(tasks))   
 }else{
     let tasks = JSON.parse(localStorage.getItem('tasks'))
     tasks.push(task)
     localStorage.setItem('tasks', JSON.stringify(tasks))
 }
 e.target.reset()
 getTask()
}

function getTask(){
    let arrayTask = JSON.parse(localStorage.getItem('tasks'))
    tasksElement.innerHTML= "";
    for (let i = 0; i < arrayTask.length; i++) {
        
        let title = arrayTask[i].titleValue
        let description = arrayTask[i].descriptionValue

        tasksElement.innerHTML += `
            <div class="card mb-3"
                <div class="card-body">
                    <p>${title} - ${description}</p>
                    <button class="btn btn-danger">
                        Delete
                    </button>
                </div>
            </div>
        `

     
    }
   
}


getTask()
//*Events
btnForm.addEventListener("submit", saveTask);
