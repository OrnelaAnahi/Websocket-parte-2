const express = require('express')
const app = express()

// IMPORTO RUTAS
const indexRoutes = require('./routes/index')


// SERVER
const http = require('http')
const server = http.createServer(app)

// PORT
const port = process.env.PORT || 8080

// ARRAY DE PRUEBA

const mensajes = [
  {
    nombre: 'Juan',
    mensaje: 'Hola mundo'
  },
  {
    nombre: 'Pedro',
    mensaje: 'Hola Juan'
  }
]



// ARCHIVOS ESTATICOS
app.use(express.static(__dirname + '/public'))

// SOCKEET
const {Server} = require("socket.io")
const io = new Server(server)

// CONECTION

io.on('connection', (socket) => {
  console.log('Nueva conexion')

  socket.emit('message_back', mensajes)
  
  socket.on('message_client', (data) => {
    console.log(data)
  })
  socket.on("mensaje_usuar", (data) => {
    mensajes.push(data)
    socket.emit('message_back', mensajes)
  })
})


// ROUTES
app.use('/api', indexRoutes)

server.listen(port, () => {
  console.log('Server listening on port 8080')
})