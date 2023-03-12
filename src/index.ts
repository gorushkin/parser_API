import express from 'express';
import cors from 'cors';
import { getData, getTransaction, uploadFile } from './controller';
import formData from 'express-form-data';
import { join } from 'path';
import { DB } from './db';
import { dbPath } from './constants';

export const db = new DB(dbPath);

const app = express();

const PORT = 3000;
const tempFilesPath = join(process.cwd(), 'files');

app.use(cors());

console.log(process.cwd());

const options = {
  uploadDir: tempFilesPath,
  // autoClean: true,
};

app.use(formData.parse(options));

app.get('/', (req, res) => {
  res.status(200).send({ data: 'test' });
});

app.post('/files', uploadFile);

app.get('/files', getTransaction)

app.listen(3000, () => {
  console.log(`app started on port ${PORT}`);
});
