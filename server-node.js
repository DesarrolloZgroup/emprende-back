require('dotenv').config()

const http = require("http")
const fs = require("fs")


function requestController(req,res){
    const url = req.url
    const method = req.method
    console.log({url,method})

    if(method ==="GET" && url ==="/"){
        res.setHeader("Content-type","text/html; charset=utf-8")
        fs.readFile('./public/index.html',function(err,file){
            //logica cunado se termina de leer el archivo
            if(err){
                console.log("se obtuvo un ERROR index")
            }
            res.write(file)
            res.end()
        })
        return
    }

    if(method==="GET" && url ==="/about"){
        res.setHeader("Content-type","text/html; charset=utf-8")
        fs.readFile('./public/about.html',function(err,file){
            //logica cunado se termina de leer el archivo
            if(err){
                console.log("se obtuvo un ERROR")
            }
            res.write(file)
            res.end()
        })
        return
    }
    res.setHeader("Content-type","text/html; charset=utf-8")
    res.write("<h1>Pagina no encontrada </h1>")
    res.end()
    //logica
    //console.log("recibimos una nueva request !!!!")
    
    //console.log({global})
    //console.log({dir : __dirname})

}
//configurar nuestro servidor 
const server = http.createServer(requestController)

const PORT = process.env.PORT

server.listen(PORT, function(){
    console.log("Aplicacion corriendo en puerto : "+PORT)
})
