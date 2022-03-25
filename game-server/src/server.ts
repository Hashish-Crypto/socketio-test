import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const port = process.env.APP_PORT || 3000
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket) => {
  console.log(socket.id + ': connected')

  socket.on('disconnect', () => {
    console.log(socket.id + ': disconnected')
  })

  socket.on('walkRight', () => {
    console.log('walkRight emitted on server')
    io.emit('walkRight')
  })
})

httpServer.listen(port, () => {
  console.log('listening on *:3000')
})
