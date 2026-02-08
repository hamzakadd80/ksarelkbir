import express, { Application } from 'express';
import cors from 'cors';
import routes from './Routes';

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private initializeRoutes() {
    this.app.use('/api', routes);
  }

  public listen(port: number) {
    this.app.listen(port, () => {
      console.log(`✅ Serveur (Class Based) démarré sur http://localhost:${port}`);
    });
  }
}