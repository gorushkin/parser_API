import { BankProperty, Property, PropertyType, RequiredBankProperty } from './types';

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
  'TRANSACTION ID': 'id',
};

export const propertyTypeMapping: Record<Property, PropertyType> = {
  id: 'string',
  description: 'string',
  payee: 'string',
  transactionDate: 'date',
  processDate: 'date',
  amount: 'number',
  balance: 'number',
  memo: 'string',
  data: 'string',
  isClear: 'boolean',
};
