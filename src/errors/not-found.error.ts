import { CustomApiError } from "./custom-api.error";

export class NotFoundApiError extends CustomApiError {
  constructor(public message: string = "NotFound") {
    super(message, 404);
  }
}
