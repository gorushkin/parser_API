import { Router } from 'express';
import { delay } from './until';
import { getFile, getTransaction, uploadFile } from './controller';

const router = Router();

router.get('/', (_req, res) => {
  const DELAY = 500;
  delay(() => res.status(200).send({ data: `delay is ${DELAY}` }), DELAY);
});

router.post('/files', uploadFile);

router.get('/files/:filename', getFile);

router.get('/files', getTransaction);

export { router };
