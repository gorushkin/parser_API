export type Value = string | Date | number;
export type PropertyType = 'number' | 'date' | 'string';

export type ConvertedValue = {
  value: Value;
  copyValue: string;
  displayValue: string;
};

export type TransactionValue = string | Date | number;

export type Transaction = Record<Property, ConvertedValue>;

export type RequiredBankProperty =
  | 'NARRATIVE'
  | 'TRANSACTION DATE'
  | 'PROCESS DATE'
  | 'AMOUNT'
  | 'BALANCE';

export type BankProperty =
  | RequiredBankProperty
  | 'ACCOUNT NUMBER'
  | 'RECEIPT NUMBER'
  | 'CARD NUMBER'
  | 'TRANSACTION  NAME'
  | 'CHANNEL'
  | 'REFERANCE'
  | 'FUNDS TRANSFER'
  | 'REFNO'
  | 'TRANSACTION ID'
  | 'IDENTIFICATION NUMBER'
  | 'TAX NUMBER'
  | 'D/C'
  | 'APPLIED FX RATE'
  | 'TRY EQUIVALENT';

export type Property =
  | 'description'
  | 'payee'
  | 'transactionDate'
  | 'processDate'
  | 'amount'
  | 'balance'
  | 'memo'
  | 'data';

export type TableMode = 'groups' | 'whole';
