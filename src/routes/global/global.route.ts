import * as express from 'express';
import { HelloWorldCTRL } from '../../controllers';

class GlobalRoutes {
  globalCTRL: HelloWorldCTRL;
  constructor(private app: express.Express) {
    this.globalCTRL = new HelloWorldCTRL();
  }

  mapRoutes = () => {
    this.app.get('/_sys/time', (req, res) =>
      res.send(new Date().toLocaleString()),
    );
    this.app.get('/', (req, res) => res.send(console.log('Hello World')));
    this.app.get('/helloworld', this.globalCTRL.helloworld);
  };
}

export { GlobalRoutes };
