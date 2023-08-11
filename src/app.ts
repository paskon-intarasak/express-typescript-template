import * as express from 'express';
import { urlencoded, json } from 'express';
import * as cors from 'cors';
import * as base from './base';
import { Configuration } from './config';
import { GlobalRoutes } from './routes';
import { createClient } from '@supabase/supabase-js';

// ====== READ Configuration  ======
Configuration.init();

// ====== For Databases  ======
async function initDatabases() {
  try {
  } catch (error) {
    console.error(`Failed to initialize supabase : ${error}`);
    process.exit(1);
  }
}

// ====== For Server  ======
let app: express.Express;

async function initServer() {
  // ====== SET Global Instance  ======
  app = express();

  // ====== SET Global Middlewares  ======
  app.use(base.metricsMiddleware(Configuration.title)); // Monitor by Prometheus
  app.use(cors());
  app.use(urlencoded({ extended: false })); // Parse 'application/x-www-form-urlencoded'
  app.use(json({ limit: '20MB' })); // Parse 'application/json'
  // ====== INIT LOGGER =======
  base.initLogging(app);
  // ====== INIT ROUTES  ======
  new GlobalRoutes(app).mapRoutes();
  base.initLoggingError(app);
  // ====== START Server  ======
  app.listen(Configuration.port, async () => {
    console.log(`=========== APP: ${Configuration.title}`);
    console.log(`=========== APP-PORT: ${Configuration.port}`);
    console.log(`=========== APP-TIMEZONE: ${Configuration.timezone}`);
  });
}

// ====== START Server  ======
initDatabases().then(initServer);

export { app };
