const socket = io()

socket.on('message_back', (data) => {
  render(data)
  socket.emit('message_client', 'Hola desde el cliente')
})

const render = (data) => {
  const html = data.map(elem =>{
    return `
      <div>
        <p><strong>${elem.nombre}: </strong>${elem.mensaje}</p>
      </div>
    `
  }).join(" ")
  document.getElementById('messages').innerHTML = html
}

const formulario = document.getElementById('formulario')

formulario.addEventListener('submit', (e) => {
  e.preventDefault()
  const nombre = document.getElementById('name').value
  const mensaje = document.getElementById('message').value
  socket.emit('mensaje_usuar', {nombre, mensaje})
  nombre = " "
  mensaje = ""
})