import * as path from 'path';
import * as express from 'express';
import { urlencoded, json } from 'express';
import * as cors from 'cors';
import * as base from './base';

import { Configuration } from './config'
import { Routes } from './routes'
// import { } from './controllers'
import { ApiResponse } from './base';

//====================
const multer = require('multer');
let fs = require('fs-extra');
const storageStation = multer.diskStorage({
  destination: (req, file, cb) => {
    var path = ``;
    if (
      process.env.APP_ENV !== 'develop' &&
      process.env.APP_ENV !== 'production'
    ) {
      path = `photos/station/`;
    } else {
      path = `${process.env.IMG_PATH}/station/`;
    }

    fs.mkdirsSync(path);
    cb(null, path);
  },
  filename: (req, file, cb) => {
    let ext = file.mimetype.split('/')[1];
    cb(null, `${Date.now()}.${ext}`);
  },
});
const uploadFilter = function (req, file, cb) {
  if (
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb('อัพโหลดไฟล์เฉพาะนามสกุล .png, .jpg and .jpeg เท่านั้น', false);
  }
};

const fileErrorHandler = (err, req, res, next) => {
  if (err) {
    return ApiResponse.BadRequest(res, err);
  } else {
    next();
  }
};

const uploadStation = multer({
  storage: storageStation,
  fileFilter: uploadFilter,
});

// ====== READ Configuration  ======
Configuration.init();

// ====== For Databases  ======
async function initDatabases() { }

// ====== For Server  ======
let app: express.Express;

async function initServer() {
  // ====== SET Global Instance  ======
  app = express();

  // ====== SET Static Resources  ======
  // app.use('/static', express.static(path.join(__dirname, 'public')));

  // ====== SET Global Middlewares  ======
  app.use(base.metricsMiddleware(Configuration.title)); // Monitor by Prometheus
  app.use(cors());
  app.use(urlencoded({ extended: false })); // Parse 'application/x-www-form-urlencoded'
  app.use(json({ limit: '20MB' })); // Parse 'application/json'
  // app.use(formDataMiddleware({ encoding: 'utf-8' })); // app.use(formDataMiddleware({ encoding: 'utf-8', uploadDir: '......', multiples: true, }));
  // ====== INIT LOGGER =======
  base.initLogging(app);
  // ====== INIT ROUTES  ======
  new Routes(app).mapRoutes();
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
