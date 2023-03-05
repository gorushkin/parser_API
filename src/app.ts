import { propertyMapping, propertyTypesMapping } from './constants';
import {
  PropertyType,
  BankProperty,
  Transaction,
  Value,
  RequiredBankProperty,
  ConvertedValue,
} from './types';

class Parser {
  data: string[] | null;

  constructor() {
    this.data = null;
  }

  parseLine(line: string) {
    return line.split('\t').map((item) => item.trim());
  }

  getProperties(line: string): string[] {
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

  private convertValue(
    value: string,
    type: PropertyType
  ): { displayValue: string; copyValue: string; value: Value } {
    const mapping = {
      number: (value = '') => ({
        value: Number(value.replace(',', '')),
        displayValue: value,
        copyValue: value.replace(',', ''),
      }),
      string: (value = '') => ({
        value: value,
        displayValue: value,
        copyValue: value,
      }),
      date: (value = '') => ({
        value: this.parseDate(value),
        displayValue: value,
        copyValue: value,
      }),
    };

    return mapping[type](value);
  }

  private getTransaction(lines: string[], bankProperties: string[]): Transaction[] {
    const filteredLines = lines.filter((item) => !!item);
    const convertedLines = filteredLines.map((row) => {
      const parsedRow = this.parseLine(row);

      const rawTransaction = bankProperties.map(
        (
          key,
          i
        ): {
          key: BankProperty;
          value: string;
        } => ({ key: key as BankProperty, value: parsedRow[i] })
      );

      const initTransactionValues: Record<string, ConvertedValue> = {
        data: {
          copyValue: row,
          value: row,
          displayValue: row,
        },
        memo: {
          copyValue: '',
          value: '',
          displayValue: '',
        },
      };

      const transaction = rawTransaction.reduce((acc: Transaction, { key, value }) => {
        const property = propertyMapping[key as RequiredBankProperty];
        if (!property) return acc;
        const propertyType = propertyTypesMapping[property];
        const convertedValue = this.convertValue(value, propertyType);
        return { ...acc, [property]: convertedValue };
      }, initTransactionValues as Transaction);

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
    console.log('transactions: ', transactions);

    return { headers: [] as string[], operations: [] };
  }
}

export { Parser };
