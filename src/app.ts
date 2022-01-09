import 'reflect-metadata';

import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import chalk from 'chalk';
import { Server } from 'http';

import globalErrorHandler from './errors/globalErrorHandler';
import Database from './database/database';
import Routes from './routes';
import trim from './middleware/trim';

class App {
  public app: Application;
  private readonly port: number;

  constructor(app: Application, port: number) {
    this.app = app;
    this.port = port;
    this.loadMiddleWares();
    this.routes();
    this.errorHandlers();
  }

  public start(): Server {
    return this.app.listen(this.port, () => {
      console.log(chalk.bold('APP running at http//:localhost:5000'));
    });
  }

  private loadMiddleWares(): void {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(trim);
  }

  private routes(): void {
    new Routes(this.app);
  }

  private errorHandlers(): void {
    this.app.use(globalErrorHandler);

    //invalid routes
    this.app.use('*', (_, res: Response) => {
      res.status(404).json({
        status: false,
        message: 'Page not found.',
      });
    });
  }
}

//start app

const app = new App(express(), 5000);

app.start();

//connect db

const database = new Database();

database.connect();
