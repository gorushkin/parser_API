import path, { join } from 'path';
import { Transaction } from 'parser';
import fs from 'fs/promises';

export class DB {
  transactionsPath: string;

  constructor(path: string) {
    this.transactionsPath = join(process.cwd(), path);
  }

  async updateTransactions(data: Transaction[], name: string) {
    const nameWithExt = `${name}.json`;
    const filePath = join(this.transactionsPath, nameWithExt);
    const serializedData = JSON.stringify(data, null, 2);
    try {
      const res = await fs.writeFile(filePath, serializedData);
      return { data: res, error: null, ok: true };
    } catch (error) {
      return { data: null, error, ok: false };
    }
  }

  async getTransactions() {
    try {
      const fileNames = await fs.readdir(this.transactionsPath);
      const info = fileNames.map((filename) => path.parse(filename).name);
      return { data: info, error: null, ok: true };
    } catch (error) {
      return { data: null, error, ok: false };
    }
  }
}
