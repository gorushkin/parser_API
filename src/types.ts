import { Request, Response } from 'express';

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
    }[];
  };
}

export type Currencies = Record<Currency, { name: string; value: string; code: Currency }>;

export type Rates = Record<string, Currencies>;
