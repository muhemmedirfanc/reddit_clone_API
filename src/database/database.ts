import 'reflect-metadata';
import { createConnection } from 'typeorm';
import chalk from 'chalk';

class Database {
  async connect(): Promise<void> {
    await createConnection().catch((error) => console.log(chalk.red(error)));
    console.log(chalk.yellowBright('Database connected.'));
  }
}

export default Database;
