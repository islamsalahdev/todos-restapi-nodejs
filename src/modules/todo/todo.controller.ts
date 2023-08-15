import type { Request, Response } from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodoAndUpdate,
  getTodos,
} from "./todo.service";
import { CreateTodoInput, GetTodoParams, UpdateTodoInput } from "./todo.schema";
import { NotFoundApiError } from "../../errors";

/** Create new todo
 * @access private
 * @method POST
 * @route api/todos
 */
export const createTodoHandler = async (
  req: Request<{}, {}, CreateTodoInput>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const todo = await createTodo({ user: userId, ...req.body });
  return res.status(201).json({ todo });
};

/** Get todo
 * @access private
 * @method GET
 * @route api/todos/id
 */
export const getTodoHandler = async (
  req: Request<GetTodoParams>,
  res: Response
) => {
  const { id: todoId } = req.params;
  const userId = res.locals.user._id;
  const todo = await getTodo({ _id: todoId,user:userId});  
  if (!todo) {
    throw new NotFoundApiError(`No todo with that id :${todoId}`);
  }
  return res.status(200).json({ todo });
};

/**Get All todos
 * @access private
 * @method GET
 * @route api/todos/
 */
export const getTodosHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const todos = await getTodos({ user: userId });
  return res.status(200).json({ todos });
};

/**Update todo
 * @access private
 * @method PATCH
 * @route api/todos/id
 */
export const updateTodoHandler = async (
  req: Request<GetTodoParams, {}, UpdateTodoInput>,
  res: Response
) => {
  const { id: todoId } = req.params;
  const userId = res.locals.user._id;
  const todo = await getTodoAndUpdate({ _id: todoId, user: userId }, req.body);
  if (!todo) {
    throw new NotFoundApiError(`No todo with that id: ${todoId}`);
  }

  return res.status(200).json({ updated: !!todo, todo });
};

/**Delete todo
 * @access private
 * @method DELETE
 * @route /api/todos/id
 */
export const deleteTodoHandler = async (
  req: Request<GetTodoParams>,
  res: Response
) => {
  const { id: todoId } = req.params;
  const userId = res.locals.user._id;
  const result = await deleteTodo({ _id: todoId, user: userId });
  if (!result) {
    throw new NotFoundApiError(`No todo with that id: ${todoId}`);
  }
  return res.sendStatus(204);
};
