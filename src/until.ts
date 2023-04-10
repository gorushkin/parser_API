import { Stream } from 'stream';
import fs from 'fs/promises';
import axios from 'axios';
import convert from 'xml-js';
import { Currencies, CurResponse } from './types';

export const getBody = async (stream: Stream): Promise<any> => {
  return new Promise((resolve, reject) => {
    const body: Uint8Array[] = [];

    stream.on('data', (chunk) => {
      body.push(chunk);
    });

    stream.on('end', () => {
      resolve(Buffer.concat(body));
    });

    stream.on('error', () => reject(new Error('There is Something wrong')));
  });
};

export const makeDir = async (path: string) => {
  try {
    await fs.mkdir(path);
  } catch (error) {
    console.log('error: ', error);
  }
};

export const checkFilesPath = async (path: string) => {
  try {
    await fs.access(path);
  } catch (error) {
    await makeDir(path);
  }
};

export const delay = async (cb: Function, time: number = 1000) =>
  new Promise((resolve) => setTimeout(() => resolve(cb()), time));

const convertStringToNumber = (str: string) => parseFloat(str.replace(',', '.'));

const getValue = (value: string, nominal: string) => {
  return Number((convertStringToNumber(value) / convertStringToNumber(nominal)).toFixed(4));
};

export const getRate = async (date: string) => {
  const URL = `https://www.cbr.ru/scripts/XML_daily_eng.asp?date_req=${date}`;
  const { data } = await axios(URL);
  const convertedData = convert.xml2js(data, { compact: true });
  const parsedData = convertedData as CurResponse;
  const valutes = parsedData.ValCurs.Valute;
  const currencies = valutes.reduce<Currencies>(
    (acc, item) => ({
      ...acc,
      [item.CharCode._text]: {
        name: item.Name._text,
        _value: convertStringToNumber(item.Value._text),
        _nominal: convertStringToNumber(item.Nominal._text),
        value: getValue(item.Value._text, item.Nominal._text),
        code: item.CharCode._text,
      },
    }),
    {} as Currencies
  );
  return currencies;
};

export const getRoundedValue = (value: number) => Math.round(value * 100) / 100;
