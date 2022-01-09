import { Router } from 'express';
import AuthHandler from '../controllers/auth/authHandler';

class AuthRoutes {
  public router: Router;
  private auth: AuthHandler = new AuthHandler();

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes() {
    this.router.post('/register', this.auth.register);
  }
}

export default AuthRoutes;
