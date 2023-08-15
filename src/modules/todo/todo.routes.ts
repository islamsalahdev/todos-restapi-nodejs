import { Router } from "express";
import {
  createTodoHandler,
  deleteTodoHandler,
  getTodoHandler,
  getTodosHandler,
  updateTodoHandler,
} from "./todo.controller";
import {
  createTodoSchema,
  deleteTodoSchema,
  getTodoParamsSchema,
  updateTodoSchema,
} from "./todo.schema";
import { validateRequest } from "../../middelwares";

const todosRouter = Router();

todosRouter
  .route("/")
  .get(getTodosHandler)
  .post(validateRequest(createTodoSchema), createTodoHandler);
todosRouter
  .route("/:id")
  .get(validateRequest(getTodoParamsSchema), getTodoHandler)
  .patch(validateRequest(updateTodoSchema), updateTodoHandler)
  .delete(validateRequest(deleteTodoSchema), deleteTodoHandler);

export default todosRouter;
