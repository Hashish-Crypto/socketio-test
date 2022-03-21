import { Socket } from 'socket.io'

interface MySocketInterface {
  handleConnection(socket: Socket): void
  middlewareImplementation?(socket: Socket, next: any): void
}

export default MySocketInterface
