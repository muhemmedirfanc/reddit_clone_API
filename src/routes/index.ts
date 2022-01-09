import { Application } from 'express';
import AuthRoutes from './auth';

class Routes {
  constructor(app: Application) {
    app.use('/api/auth', new AuthRoutes().router);
  }
}

export default Routes;
