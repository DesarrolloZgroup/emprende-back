require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const mongoose =require('mongoose')
const Schema = mongoose.Schema

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Conexion exitosa a la BDD!")
}).catch( (err)=>console.log("Hubo un error al conectarnos ala BBDD",{err}))

//creamos una estructura
const taskSchema = new Schema({
    name : String,
    done : Boolean
    //createBy 
})
//interactuamos ocn la estructura con el MODELO 
const Task = mongoose.model("Task",taskSchema,"Taskss")
//Middleware de archivos estáticos
app.use(express.static('public'))

app.use(express.json())

app.use((req,res,next) => {
    console.log("No especificamos cómo debe ser el inicio de la ruta")
    console.log("Middleware 1")
    next()
})
const logger = {
    logThis: (whatToLog) => {
        return (req,res,next) =>{
            console.log("Middleware 2 : ", whatToLog)
            next()
        }
    },
}

app.use("/martin",logger.logThis("Logueame esto!"))

app.post("/api/tasks",function(req,res){
    const body = req.body
    console.log({body})
    Task.create({
        name:body.text,
        done :false,
        hello:"Hola luis"
    }).then((createdTask)=>{
        res.status(201).json({ok:true , message: "Tarea creada con éxito",data: createdTask})
    }).catch((err) => {
        res.status(400).json({ok:false , message: "Error al crear la tarea"})
    })
})

app.put("/api/tasks/:id",function(req,res){
    const body = req.body
    //el id a modificar
    const id = req.params.id
    console.log({body})
    Task.findByIdAndUpdate(id , {
        name:body.text,

    }).then((upadteTask)=>{
        res.status(200).json({ok:true , message: "Tarea al actualizar con éxito",data: upadteTask})
    }).catch((err) => {
        res.status(400).json({ok:false , message: "Error al editar la tarea"})
    })
})

app.delete("/api/tasks/:valor",function(req,res){
    const id = req.params.valor
    //console.log({params : req.params})
    //Task.deleteOne({_id:id})
    Task.findByIdAndRemove(id).then((deletedTask) =>{
        res.status(200).json({ok:true ,data :deletedTask ,message : "Eliminado correctamente "})
    }).catch( () => {
        res.status(400).json({ok:false,message:"Hubo un error al elimanar la tarea"})
    })
})

app.get("/api/tasks",function(req,res){
    Task.find().then((tasks)=>{
        res.status(200).json({ok:true ,data :tasks})
    }).catch((err)=>{
        res.status(400).json({ok:false,message:"Hubo un error al obtener los datos"})
    })
})



/*
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', (req, res) => {
    res.send([{"name":"Luis"},{"name":"Pablo"}])
  })



*/

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })