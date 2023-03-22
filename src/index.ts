import express, { Express } from 'express';
import cors from 'cors';
import { getTransaction, uploadFile } from './controller';
import formData from 'express-form-data';
import { join } from 'path';
import { DB } from './db';
import { dbPath } from './constants';
import { checkFilesPath, delay } from './until';

export const db = new DB(dbPath);

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

  app.get('/', (req, res) => {
    delay(() => res.status(200).send({ data: 'delay is 500' }), 500);
  });

  app.post('/files', uploadFile);

  app.get('/files', getTransaction);

  app.listen(3000, () => {
    console.log(`app started on port ${port}`);
  });
};

init(app, tempFilesPath, PORT);
