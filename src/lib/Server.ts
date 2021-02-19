import express from 'express';
import home from './routes/get-home';
import getStart from './routes/get-start';
import getStop from './routes/get-stop';
import notFound from './routes/not-found';

export default class Server {
  private app: express.Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT, 10) || 8000;
  }

  async init() {
    // basics mw

    // routes
    this.app.get('/', home);
    this.app.get('/start', getStart);
    this.app.get('/stop', getStop);
    this.app.use(notFound);

    this.app.listen(this.port, () => {
      console.log('Server started on port', this.port);
    });
  }
}
