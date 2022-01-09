import { NextFunction, Request, Response } from 'express';
import AuthController from './auth';

class AuthHandler {
  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, username, password }: { email: string; username: string; password: string } = req.body;

      let auth = new AuthController();

      const response = await auth.doRegister({ email, username, password });

      res.json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default AuthHandler;
