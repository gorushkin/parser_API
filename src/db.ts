import path, { join } from 'path';
import { Transaction } from 'parser';
import fs from 'fs/promises';

export class DB {
  transactionsPath: string;

  constructor(path: string) {
    this.transactionsPath = join(process.cwd(), path);
  }

  private async makeDbFolder() {
    try {
      await fs.mkdir(this.transactionsPath);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  private async checkPath() {
    try {
      await fs.access(this.transactionsPath);
    } catch (error) {
      await this.makeDbFolder();
    }
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
      await this.checkPath();
      const fileNames = await fs.readdir(this.transactionsPath);
      const info = fileNames.map((filename) => path.parse(filename).name);
      return { data: info, error: null, ok: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      return { data: null, error: message, ok: false };
    }
  }

  async getTransaction(name: string) {
    const transactionPath = path.join(this.transactionsPath, `${name}.json`);
    try {
      const buffer = await fs.readFile(transactionPath);
      const data = JSON.parse(buffer.toString());
      return { data, error: null, ok: true };
    } catch (error) {
      const message = 'The filename is not correct';
      return { data: null, error: message, ok: false };
    }
  }
}
