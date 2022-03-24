import Websocket from '../modules/websocket/websocket'

type Order = {
  id: string
  date: string
  total: string
  status: string
}

class OrdersService {
  public insertOrder(order: Order) {
    //save in your database

    //send the update to the browser
    this.updateSockets(order)
  }

  private updateSockets(order: Order) {
    const io = Websocket.getInstance()
    io.of('orders').emit('orders_updated', { data: [order] })
  }
}

export default OrdersService
