import { Router, type Response } from "express";
import todosRoutes from "./modules/todo/todo.routes";
import authRoutes from "./modules/auth/auth.routes";

const router = Router();
router.get("/healthz", (_, res: Response) => res.send({ status: "Ok" }));
router.use("/todos", todosRoutes);
router.use("/auth", authRoutes);

export default router;
