import { CustomApiError } from "./custom-api.error";

export class UnAuthenticationApiError extends CustomApiError {
  constructor(public message: string = "Unauthorized") {
    super(message, 401);
  }
}
