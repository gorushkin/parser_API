import express, { Express } from 'express';
import cors from 'cors';
import formData from 'express-form-data';
import { join } from 'path';
import { DB } from './db';
import { dbPath } from './constants';
import { checkFilesPath } from './until';
import { router } from './routes';

export const db = new DB();
db.init(dbPath);

const app = express();

const PORT = 3000;
const tempFilesPath = join(process.cwd(), 'files');

const init = async (app: Express, tempFilesPath: string, port: number) => {
  await checkFilesPath(tempFilesPath);

  app.use(cors());

  const options = {
    uploadDir: tempFilesPath,
    // autoClean: true,
  };

  app.use(formData.parse(options));

  app.use('/', router);

  app.listen(3000, () => {
    console.log(`app started on port ${port}`);
  });
};

init(app, tempFilesPath, PORT);
