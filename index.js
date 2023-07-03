require('dotenv').config()

const http = require("http")

function requestController(){
    //logica
    console.log("recibimos una nueva request !!!!")
    
    //console.log({global})
    //console.log({dir : __dirname})

}
//configurar nuestro servidor 
const server = http.createServer(requestController)

const PORT = process.env.PORT

server.listen(PORT, function(){
    console.log("Aplicacion corriendo en puerto : "+PORT)
})
