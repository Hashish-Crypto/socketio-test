import 'dotenv/config'
import 'reflect-metadata'
import { Server } from 'socket.io'
import express from 'express'
import http from 'http'
import fs from 'fs'

const sourceRoot = __dirname.replace('\\dist', '')
fs.copyFile(sourceRoot + '\\src\\index.html', __dirname + '\\index.html', (err) => {
  if (err) throw err
})

const app = express()
const server = http.createServer(app)
// const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server)
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('chat message', (msg: string) => {
    console.log('message: ' + msg)
    io.emit('chat message', msg)
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})
