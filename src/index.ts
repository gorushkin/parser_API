import { Parser } from './app';
import { getFileData, getParsedArguments } from './utils';
console.clear();

const parser = new Parser();

async function app() {
  const args = process.argv.slice(2);

  const { file } = getParsedArguments(args);

  if (!file) throw new Error('You should set the file path');

  const data = await getFileData(file.toString());

  const qwe = parser.parse(data);
}

app();
