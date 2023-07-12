/*
const { lutimesSync } = require("fs")

console.log("Este JS va aser interpretado por el NAVEGADOR")

const button = document.querySelector("button")
console.log({button})

button.addEventListener("click", function(){
    console.log("se hizo click")
    fetch("http://localhost:4000/users")
})
function suma1(param1,param2){
    console.log({param1,param2})
    if(typeof param1 !== "number" || typeof param1 !== "number"){
        throw Error("Ambos argumentos deben ser de tipo numerico")
    }
    let total =param1+param2
    return total
}
const suma = (base,exp)=>base + exp
const arg1 = 3
const arg2 = 5

console.table({
    constants :suma(arg1,arg2),
    values : suma(10,20),
    expresions : suma(2+2 , 5*8),
    error1:suma(3),
    error2:suma(2,"2"),
    error3: suma("Luis","Pablo"),
})

const exp1 = (base,exp)=>{
    let total = base**exp
    return total
}

const exp2 = (base,exp)=>base **exp

var name = "luis"

const calculations = {
    name : "calculations",
    sayMyName : function(){
        console.log("Mi nombre es  : " +this.name)
    },
    sayMyNameArrow : () => {
        console.log("mi nombre es arrow es : "+nombre)
    }
}

calculations.sayMyName()
calculations.sayMyNameArrow()

*/
//const getBtn =  document.querySelector("#get-tasks")
const createBtn = document.querySelector("#create-task")
const input = document.querySelector("#task-name")
const tasksDIV = document.querySelector("#tasks_container")

//Nutrir de funcionalidad a los botones 
/*
getBtn.addEventListener("click",function(){
    console.log("GET TAREAS")
    fetch("http://localhost:4000/api/tasks")
})

*/
const baseBackendURL = "http://localhost:4000/api"

let TASK_TO_EDIT = null

createBtn.addEventListener("click",function(){
    console.log("Crear tarea")
    const creating =!TASK_TO_EDIT
    console.log({input})
    // establecemos una decison de ruta
    const path = creating ? "tasks" : `tasks/${TASK_TO_EDIT._id}`
    //establecemos decision de metodo 
    const method = creating ? "POST" : "PUT"
    fetch(`${baseBackendURL}/${path}`, {
        method: method,
        headers : { "Content-Type":"application/json"},
        body:JSON.stringify({text: input.value}),
    }).then((res)=>{
            getTasks()
            //borrar la info del input
            input.value = ""
            createBtn.innerHTML = "CREAR TAREA"
            return res.json()
        }).then((resJSON)=>{
        console.log({resJSON})
    })
})
// funcion para llamar a los datos 
function getTasks(){
    tasksDIV.innerHTML =null
    fetch(`${baseBackendURL}/tasks`
).then((res)=>res.json()).then((resJSON)=>{
    console.log({resJSON})
    //empezamos a manipular los datos
    const tasks =resJSON.data
    //por caa tarea lo vamos a mostrar 
    for(const task of tasks){
        const taskParagrah =document.createElement('p')
        //creamos boton y le damos etiqueta de borrar
        const deleteTskBtn = document.createElement("button")
        //creamos un contenedor
        const taskConatinerDiv = document.createElement("div")
        deleteTskBtn.innerText = "Borrar"
        taskParagrah.innerText =task.name
        deleteTskBtn.setAttribute('id',task._id)
        //creamos un evnto para eliminar 
        deleteTskBtn.addEventListener("click", (e) => {
            const taskId = e.target.id 
            deleteTskBtn.innerHTML ="..."
            fetch(`${baseBackendURL}/tasks/${taskId}`,{
                method : "DELETE",
            }).then( ()=>{
                const taskDiv = deleteTskBtn.parentElement
                //console.log({ taskDiv})
                taskDiv.remove()
            })
        })
        //creamos evnto en el parrafo para editar
        taskParagrah.addEventListener("click",(e) => {
            //input.value = taskParagrah.innerHTML
            input.value =  task.name
             // el boton crear tambien sirve para editar
            createBtn.innerHTML ="Editar Tarea"
            TASK_TO_EDIT = task
            console.log({TASK_TO_EDIT})
        })
        //agregams un hijo al div los datos de la etiqueta p
        taskConatinerDiv.appendChild(taskParagrah)
        taskConatinerDiv.appendChild(deleteTskBtn)
        tasksDIV.appendChild(taskConatinerDiv)
        //console.log({taskParagrah})
    }

})
}

getTasks()