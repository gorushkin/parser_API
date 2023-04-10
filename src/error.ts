export class DBError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DBError';
  }
}


export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppError';
  }
}
