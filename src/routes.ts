import { Router } from 'express';
import { delay } from './until';
import { getStatement, getStatements, uploadFile, uploadStatement } from './controller';

const router = Router();

router.get('/', (_req, res) => {
  const DELAY = 500;
  delay(() => res.status(200).send({ data: `delay is ${DELAY}` }), DELAY);
});

router.post('/files', uploadFile);

router.get('/files/:filename', getStatement);

router.get('/files', getStatements);

router.post('/statement', uploadStatement);

export { router };
