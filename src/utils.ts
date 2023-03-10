import path from 'path';
import { readFile } from 'fs/promises';

const getAbsolutePath = (filePath: string) => {
  return path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
};

type Args = Record<string, string>;

export function getParsedArguments(args: string[]) {
  const argPrefix = '--';

  const parsedArguments = args.reduce((acc: Args, item, index, array) => {
    return item.slice(0, argPrefix.length) !== argPrefix
      ? acc
      : { ...acc, [item.slice(2)]: array[index + 1] };
  }, {});

  return parsedArguments;
}

export async function getFileData(path: string): Promise<Buffer> {
  const absolutePath = getAbsolutePath(path);

  return await readFile(absolutePath);
}
