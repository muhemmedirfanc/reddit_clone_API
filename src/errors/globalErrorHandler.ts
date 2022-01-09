import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    status: false,
    message: 'Something went wrong.',
    data: {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    },
  });
};

export default globalErrorHandler;
