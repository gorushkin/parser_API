import { propertyMapping } from './constants';
import { BankProperty, Transaction, RequiredBankProperty } from './types';

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

      const initTransactionValues: Record<string, string> = {
        data: row,
        memo: '',
      };

      const transaction = rawTransaction.reduce((acc: Transaction, { key, value }) => {
        const property = propertyMapping[key as RequiredBankProperty];
        if (!property) return acc;
        if (property !== 'description') return { ...acc, [property]: value };
        const splittedValue = value.split('    ');
        const payee = value.includes('Referans') ? splittedValue[1].slice(1) : '';

        return { ...acc, [property]: value, payee };
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

    return transactions;
  }
}

export { Parser };
