import { Request, Response } from 'express';
import { Stream } from 'stream';

export const getBody = async (stream: Stream): Promise<any> => {
  return new Promise((resolve, reject) => {
    const body: Uint8Array[] = [];

    stream.on('data', (chunk) => {
      body.push(chunk);
    });

    stream.on('end', () => {
      resolve(Buffer.concat(body));
    });

    stream.on('error', () => reject(new Error('There is Something wrong')));
  });
};
