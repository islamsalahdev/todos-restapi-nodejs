import { Router } from "express";
import {
  logoutHandler,
  loginHandler,
  registerHandler,
  getMeHandler,
  refreshAccessTokenHandler,
} from "./auth.controller";
import { requiredUser } from "../../middelwares/required-user.middleware";
import { validateRequest } from "../../middelwares/validate-request.middelware";
import { logingSchema, registerSchema } from "./auth.schema";

const authRouter = Router();

authRouter.post("/login", validateRequest(logingSchema), loginHandler);
authRouter.post("/register", validateRequest(registerSchema), registerHandler);
authRouter.post("/logout", requiredUser, logoutHandler);
authRouter.get("/me", requiredUser, getMeHandler);
authRouter.post("/refresh", requiredUser, refreshAccessTokenHandler);

export default authRouter;
