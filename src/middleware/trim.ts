import { NextFunction, Request, Response } from 'express';

const trim = (req: Request, res: Response, next: NextFunction) => {
  const exceptions: string[] = ['password'];

  Object.keys(req.body).forEach((key) => {
    //if this key is not in exception and it is also  a string then trim

    if (!exceptions.includes(key) && typeof req.body[key] === 'string') {
      req.body[key] = req.body[key].trim();
    }
  });

  next();
};

export default trim;
