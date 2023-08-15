import { CustomApiError } from "./custom-api.error";

export class InternalServerApiError extends CustomApiError {
  constructor(public message: string = "InternalServer") {
    super(message, 500);
  }
}
