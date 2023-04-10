import { Request } from 'express';

export interface FormattedRequest extends Request {
  files: Record<string, File>;
}

export type File = {
  fieldName: string;
  originalFilename: string;
  path: string;
  size: number;
  name: string;
  type: string;
  headers: Record<string, string>;
};

export type Currency = 'TRY' | 'USD' | 'RUB';

export interface CurResponse {
  ValCurs: {
    Valute: {
      CharCode: {
        _text: Currency;
      };
      Name: {
        _text: string;
      };
      Value: {
        _text: string;
      };
      Nominal: {
        _text: string;
      };
    }[];
  };
}

export type Currencies = Record<
  Currency,
  {
    name: string;
    value: number;
    _nominal: number;
    code: Currency;
    _value: number;
    convertedValue: number;
  }
>;

export type Rates = Record<string, Currencies>;

export type DBResult<T> = { data: T; ok: true } | { error: string; ok: false };

export type Summary = { income: number; outcome: number, startBalance: number, endBalance: number };

export type GroupedSummary = {defaultSummary: Summary, convertedSummary: Summary }
