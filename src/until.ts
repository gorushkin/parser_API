import { Stream } from 'stream';
import fs from 'fs/promises';

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

export const makeDir = async (path: string) => {
  try {
    await fs.mkdir(path);
  } catch (error) {
    console.log('error: ', error);
  }
};

export const checkFilesPath = async (path: string) => {
  try {
    await fs.access(path);
  } catch (error) {
    await makeDir(path);
  }
};

export const delay = async (cb: Function, time: number = 1000) =>
  new Promise((resolve) => setTimeout(() => resolve(cb()), time));
