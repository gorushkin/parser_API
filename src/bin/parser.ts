import { Parser } from '../app';
import { getFileData, getParsedArguments } from '../utils';

console.clear();
const parser = new Parser();

async function app() {
  const args = process.argv.slice(2);

  const { file } = getParsedArguments(args);

  if (!file) throw new Error('You should set the file path');

  const buffer = await getFileData(file);

  const { transactions, payees } = parser.parse(buffer);
  return transactions;
}

app();
