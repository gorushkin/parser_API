export type Transaction = Record<Property, string>;

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
