import { CustomApiError } from "./custom-api.error";

export class BadRequestApiError extends CustomApiError {
  constructor(public message: string = "BadRequestApiError") {
    super(message, 400);
  }
}
