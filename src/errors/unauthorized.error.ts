import { CustomApiError } from "./custom-api.error";

export class UnAuthorizedApiError extends CustomApiError {
  constructor(public message: string = "Forbidden") {
    super(message, 403);
  }
}
