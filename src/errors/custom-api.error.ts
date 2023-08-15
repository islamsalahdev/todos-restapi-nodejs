export class CustomApiError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
