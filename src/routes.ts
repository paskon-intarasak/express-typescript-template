import * as express from 'express'
import * as CTRL from './controllers'
import * as MDW from './middlewares'


class Routes {


  constructor(
    private app: express.Express,

  ) {
    // ====== INIT Middleware ======

    // ====== INIT Controller ======

    // New CTRL


  }

  mapRoutes = () => {
    // HEALTH Check
    // this.app.use('/_sys', this.passportMiddleware.authenticate('basic', { session: false }))
    this.app.get('/_sys/time', (req, res) =>
      res.send(new Date().toLocaleString())
    )
    this.app.get('/', (req, res) =>
      res.send(console.log('Hello World'))
    )
  }
}

export { Routes }
