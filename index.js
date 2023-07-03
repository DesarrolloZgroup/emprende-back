
const http = require("http")

function requestController(){
    //logica
    console.log("recibimos una nueva request !!!!")
    
    //console.log({global})
    //console.log({dir : __dirname})

}
//configurar nuestro servidor 
const server = http.createServer(requestController)

server.listen(4000)
