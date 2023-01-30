import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as pkg from '../package.json';
import Routes from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import authorizedHosts from './middlewares/authorizedHosts.middleware';

class App {
  public app: express.Application;
  public port: (string | number);
  public env: boolean;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3900;
    this.env = process.env.NODE_ENV === 'production' ? true : false;

    this.connectToDatabase().then(() => {
      //
    });
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    if (this.env) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(logger('combined'));
      // this.app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
    } else {
      this.app.use(logger('dev'));
      // this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(express.json());
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    this.app.use(cookieParser());
    this.app.use(authorizedHosts);
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/api', route.router);
      this.app.get('/', (req, res) => {
        res.status(200).send({
          api: 'krowd-api',
          version: pkg.version,
        });
      });
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private async connectToDatabase() {
    try {
      const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env;
      const options = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
      await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`, { ...options });
    } catch (error) {
      console.error('[ERROR]', error);
    }
  }
}

export default App;
