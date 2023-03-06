import { BankProperty, Property, RequiredBankProperty } from './types';

export const ColumnsMapping: Record<Property, BankProperty | null> = {
  description: 'NARRATIVE',
  payee: null,
  transactionDate: 'TRANSACTION DATE',
  processDate: 'PROCESS DATE',
  amount: 'AMOUNT',
  balance: 'BALANCE',
  memo: null,
  data: null,
};

export const requiredBankProperties: BankProperty[] = [
  'NARRATIVE',
  'TRANSACTION DATE',
  'PROCESS DATE',
  'AMOUNT',
  'BALANCE',
];

export const propertyMapping: Record<RequiredBankProperty, Property> = {
  AMOUNT: 'amount',
  NARRATIVE: 'description',
  BALANCE: 'balance',
  'PROCESS DATE': 'processDate',
  'TRANSACTION DATE': 'transactionDate',
};

export const properties: Property[] = [
  'processDate',
  'transactionDate',
  'amount',
  'balance',
  'description',
  'payee',
  'memo',
  'data',
];
