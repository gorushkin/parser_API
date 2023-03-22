import path, { join } from 'path';
import { Transaction } from 'parser';
import fs from 'fs/promises';
import { DBError } from './error';

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

  private async checkPath(path: string) {
    try {
      await fs.access(path);
      return true;
    } catch (error) {
      return false;
    }
  }

  private async writeData(filePath: string, serializedData: string) {
    try {
      await fs.writeFile(filePath, serializedData);
      return { data: 'The statement was updated succesfully', error: null, ok: true };
    } catch (error) {
      return { data: null, error, ok: false };
    }
  }

  async updateStatement(data: Transaction[], name: string) {
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

  async getStatements() {
    try {
      const isTargetExist = await this.checkPath(this.transactionsPath);
      if (!isTargetExist) this.makeDbFolder();
      const fileNames = await fs.readdir(this.transactionsPath);
      const info = fileNames.map((filename) => path.parse(filename).name);
      return { data: info, error: null, ok: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      return { data: null, error: message, ok: false };
    }
  }

  async getStatement(name: string) {
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

  async saveStatement(name: string, statement: Transaction[]) {
    const nameWithExt = `${name}.json`;
    const filePath = join(this.transactionsPath, nameWithExt);
    const serializedData = JSON.stringify(statement, null, 2);
    const isTargetExist = await this.checkPath(filePath);
    try {
      if (!isTargetExist) throw new DBError('The file name is not correct');
      return await this.writeData(filePath, serializedData);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      return { data: null, error: message, ok: false };
    }
  }
}
