import 'dotenv/config'
import 'reflect-metadata'
import { Server } from 'socket.io'
import express from 'express'
import http from 'http'
import fs from 'fs'

interface ServerToClientEvents {
  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
}

interface ClientToServerEvents {
  hello: () => void
}

interface InterServerEvents {
  ping: () => void
}

interface SocketData {
  name: string
  age: number
}

const sourceRoot = __dirname.replace('\\dist', '')
fs.copyFile(sourceRoot + '\\src\\index.html', __dirname + '\\index.html', (err) => {
  if (err) throw err
})

const app = express()
const server = http.createServer(app)
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})
