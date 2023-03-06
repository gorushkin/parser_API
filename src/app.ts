import { propertyMapping, propertyTypeMapping } from './constants';
import {
  BankProperty,
  Transaction,
  RequiredBankProperty,
  ValueType,
} from './types';

class Parser {
  data: string[] | null;

  constructor() {
    this.data = null;
  }

  private parseLine(line: string) {
    return line.split('\t').map((item) => item.trim());
  }

  private getProperties(line: string): string[] {
    return this.parseLine(line).map((item) => item.trim());
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
      number: (value = '') => Number(value.replace(',', '')),
      string: (value = '') => value,
      boolean: (value = '') => Boolean(value),
      date: (value = '') => this.parseDate(value),
    };

    return mapping[type](value);
  }

  private getTransaction(lines: string[], bankProperties: string[]): Transaction[] {
    const filteredLines = lines.filter((item) => !!item);
    const convertedLines = filteredLines.map((row) => {
      const parsedRow = this.parseLine(row);

      const rawTransaction = bankProperties.map((key, i): { key: BankProperty; value: string } => ({
        key: key as BankProperty,
        value: parsedRow[i],
      }));

      const transaction = rawTransaction.reduce<Transaction>(
        (acc, { key, value }) => {
          const property = propertyMapping[key as RequiredBankProperty];
          if (!property) return acc;
          const propertyType = propertyTypeMapping[property];
          const convertedValue = this.convertValue(value, propertyType);
          if (property !== 'description') return { ...acc, [property]: convertedValue };
          const splittedValue = value.split('    ');
          const payee = value.includes('Referans') ? splittedValue[1].slice(1) : '';

          return { ...acc, [property]: value, payee };
        },
        { isClear: false, data: row, memo: '' } as Transaction
      );

      return transaction;
    });

    return convertedLines;
  }

  parse(data: string | null) {
    if (!data) return null;

    this.data = data
      .toString()
      .split('\n')
      .filter((item) => !!item);

    const rawProperties = this.data[0];
    const rawTransaction = this.data.slice(1);

    const bankProperties = this.getProperties(rawProperties);
    const transactions = this.getTransaction(rawTransaction, bankProperties);

    return transactions;
  }
}

export { Parser };
