import { Parser } from 'parser';
import { Request, Response } from 'express';
import { FormattedRequest } from './types';
import fs from 'fs/promises';
import { db } from '.';
const parser = new Parser();

export const getData = (data: Buffer) => {
  return parser.parse(data);
};

export const uploadFile = async (req: Request, res: Response) => {
  const qwe = req as FormattedRequest;
  const files = Object.values(qwe.files);
  const fileInfo = files[0];
  const { fieldName, path } = fileInfo;
  const fileContent = await fs.readFile(path);
  const data = getData(fileContent);
  const { error, ok } = await db.updateTransactions(data.transactions, fieldName);
  if (ok) return res.status(200).send({ data: fileInfo });
  res.status(500).send({ error });
};

export const getTransaction = async (_req: Request, res: Response) => {
  const { data, error, ok } = await db.getTransactions();
  if (ok) return res.status(200).send({ data });
  res.status(500).send({ error });
};
