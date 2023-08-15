import { Router } from "express";
import todosRouter from "./modules/todo/todo.routes";
import authRouter from "./modules/auth/auth.routes";
import { requiredUser } from "./middelwares";

const apiRouter = Router()
apiRouter.get("/healthz", (_, res) => res.send({ status: "Ok" }));
apiRouter.use("/todos", requiredUser, todosRouter);
apiRouter.use("/auth", authRouter);


export default apiRouter