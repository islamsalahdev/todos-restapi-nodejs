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
import { requiredUser } from "../../middelwares/required-user.middleware";
import { validateRequest } from "../../middelwares";

const todosRouter = Router();

todosRouter
  .route("/")
  .get(requiredUser, getTodosHandler)
  .post(requiredUser, validateRequest(createTodoSchema), createTodoHandler);
todosRouter
  .route("/:id")
  .get(requiredUser, validateRequest(getTodoParamsSchema), getTodoHandler)
  .patch(requiredUser, validateRequest(updateTodoSchema), updateTodoHandler)
  .delete(requiredUser, validateRequest(deleteTodoSchema), deleteTodoHandler);

export default todosRouter;
