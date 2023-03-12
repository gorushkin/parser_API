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
