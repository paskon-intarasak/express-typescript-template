import * as express from 'express';

class GlobalRoutes {
  constructor(private app: express.Express) {}

  mapRoutes = () => {
    // HEALTH Check
    // this.app.use('/_sys', this.passportMiddleware.authenticate('basic', { session: false }))
    this.app.get('/_sys/time', (req, res) =>
      res.send(new Date().toLocaleString()),
    );
    this.app.get('/', (req, res) => res.send(console.log('Hello World')));
  };
}

export { GlobalRoutes };
