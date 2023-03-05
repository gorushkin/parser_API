import { BankProperty, PropertyType, Property, RequiredBankProperty } from './types';

export const ColumnsTypes: Record<BankProperty, PropertyType> = {
  'ACCOUNT NUMBER': 'number',
  'RECEIPT NUMBER': 'number',
  'TRANSACTION DATE': 'date',
  'PROCESS DATE': 'date',
  'CARD NUMBER': 'number',
  'TRANSACTION  NAME': 'string',
  AMOUNT: 'number',
  BALANCE: 'number',
  CHANNEL: 'string',
  REFERANCE: 'string',
  'FUNDS TRANSFER': 'string',
  REFNO: 'number',
  'TRANSACTION ID': 'number',
  'IDENTIFICATION NUMBER': 'number',
  'TAX NUMBER': 'number',
  'D/C': 'string',
  NARRATIVE: 'string',
  'APPLIED FX RATE': 'number',
  'TRY EQUIVALENT': 'number',
};

export const propertyTypesMapping: Record<Property, PropertyType> = {
  amount: 'number',
  balance: 'number',
  data: 'string',
  description: 'string',
  payee: 'string',
  processDate: 'date',
  transactionDate: 'date',
  memo: 'string',
};

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
  'description',
  'payee',
  'transactionDate',
  'processDate',
  'amount',
  'balance',
  'memo',
  'data',
];
