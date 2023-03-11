import { propertyMapping, propertyTypeMapping } from './constants';
import xlsx from 'node-xlsx';

import {
  BankProperty,
  Transaction,
  RequiredBankProperty,
  ValueType,
  SheetLine,
  Sheet,
  PayeeInfo,
  Payee,
  Payees,
} from './types';

class Parser {
  private parseLine(line: string) {
    return line.split('\t').map((item) => item.trim());
  }

  private getProperties(headers: SheetLine): string[] {
    return Object.values(headers).map((item) => item.trim());
  }

  private parseDate(value: string) {
    const [rawDate, rowTime = '00:00'] = value.split(' ');
    const [day, month, year] = rawDate.split('.');
    const [hour, minutes] = rowTime.split(':');
    const time = `${hour}:${minutes}:00`;
    const date = `${year}-${month}-${day}`;
    return new Date(`${date}T${time}`);
  }

  private convertValue(value: string, type: ValueType) {
    const mapping = {
      number: (value = '') => value,
      string: (value = '') => value,
      boolean: (value = '') => Boolean(value),
      date: (value = '') => this.parseDate(value).toISOString(),
    };

    return mapping[type](value);
  }

  private fillEmptyValues(line: SheetLine): string[] {
    const res = [];

    for (const element of line) {
      res.push(element || '');
    }

    return res;
  }

  private getPayeeName = (data: string): PayeeInfo => {
    if (!data.includes('Referans')) return { payeeId: '', payeeName: '' };
    const payeeId = data.substring(38, 45);
    const payeeName = data.substring(62, 100);
    return { payeeId, payeeName };
  };

  private getTransaction(lines: SheetLine[], bankProperties: string[]): Transaction[] {
    const filteredLines = lines.filter((item) => !!item);
    const convertedLines = filteredLines.map((row) => {
      const rawTransaction = bankProperties.map((key, i): { key: BankProperty; value: string } => ({
        key: key as BankProperty,
        value: row[i],
      }));

      const transaction = rawTransaction.reduce<Transaction>(
        (acc, { key, value }) => {
          const property = propertyMapping[key as RequiredBankProperty];
          if (!property) return acc;
          const propertyType = propertyTypeMapping[property];
          const convertedValue = this.convertValue(value, propertyType);
          if (property !== 'description') return { ...acc, [property]: convertedValue };
          const payee = this.getPayeeName(value);
          return { ...acc, [property]: value, ...payee };
        },
        { isClear: false, memo: '', data: row.join('\t') } as Transaction
      );

      return transaction;
    });

    return convertedLines;
  }

  private getPayees = (transactions: Transaction[]): Payees => {
    return transactions.reduce<Payees>(
      (acc, { payeeId, payeeName }) => ({
        ...acc,
        ...(payeeId && { [payeeId]: { id: payeeId, name: payeeName, displayName: '' } }),
      }),
      {}
    );
  };

  private convert(data: Sheet[]) {
    const sheet = data[0].data as SheetLine[];
    const rawProperties = sheet[5];
    const bankProperties = this.getProperties(rawProperties);

    const rawTransactions = sheet.slice(6, -4);
    const filledTransactions = rawTransactions.map(this.fillEmptyValues);
    const transactions = this.getTransaction(filledTransactions, bankProperties);
    const payees = this.getPayees(transactions);

    return { transactions, payees };
  }

  parse(buffer: Buffer): { transactions: Transaction[]; payees: Payees } {
    const data = xlsx.parse(buffer, { blankrows: false });
    return this.convert(data);
  }
}

export { Parser };
