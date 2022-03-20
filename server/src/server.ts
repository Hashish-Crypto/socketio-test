import 'dotenv/config'
import 'reflect-metadata'

import { createExpressServer, RoutingControllersOptions } from 'routing-controllers'

const port = process.env.APP_PORT || 3000

const routingControllerOptions: RoutingControllersOptions = {
  routePrefix: 'v1',
  controllers: [`${__dirname}/modules/http/*.controller.*`],
  validation: true,
  classTransformer: true,
  cors: true,
  defaultErrorHandler: true,
}

const app = createExpressServer(routingControllerOptions)

app.listen(port, () => {
  console.log(`This is working in port ${port}`)
})
