import { Server, Socket } from 'socket.io'
import { Server as ServerHTTP } from 'http'

const WEBSOCKET_CORS = {
  origin: '*',
  methods: ['GET', 'POST'],
}

class Websocket extends Server {
  private static io: Websocket

  constructor(httpServer: ServerHTTP) {
    super(httpServer, {
      cors: WEBSOCKET_CORS,
    })
  }

  public static getInstance(httpServer?: ServerHTTP): Websocket {
    if (!Websocket.io) {
      if (httpServer) {
        Websocket.io = new Websocket(httpServer)
      }
    }

    return Websocket.io
  }

  public initializeHandlers(socketHandlers: Array<any>) {
    socketHandlers.forEach((element) => {
      const namespace = Websocket.io.of(element.path, (socket: Socket) => {
        element.handler.handleConnection(socket)
      })

      if (element.handler.middlewareImplementation) {
        namespace.use(element.handler.middlewareImplementation)
      }
    })
  }
}

export default Websocket
