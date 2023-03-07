export type Transaction = {
  id: string;
  description: string;
  payee: string;
  transactionDate: string;
  processDate: string;
  amount: number;
  balance: number;
  memo: string;
  data: string;
  isClear: boolean;
};

export type RequiredBankProperty =
  | 'NARRATIVE'
  | 'TRANSACTION DATE'
  | 'PROCESS DATE'
  | 'AMOUNT'
  | 'BALANCE'
  | 'TRANSACTION ID';

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
  | 'data'
  | 'isClear'
  | 'id';

export type ValueType = 'string' | 'date' | 'boolean' | 'number';

export type Value = string | Date | number | boolean;
export type PropertyType = 'string' | 'date' | 'boolean' | 'number';

export type Converter = (
  value: string,
  type: 'string' | 'date' | 'boolean' | 'number'
) => number | string | boolean | Date;
