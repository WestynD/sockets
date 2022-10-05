const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.use(express.static('public'))

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg)
    io.emit('chat message', msg)
  })
})

io.on('rpsls', (buffer) => {
  io.emit('rpsls', buffer)
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})
