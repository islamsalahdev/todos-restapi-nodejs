import { object, string, TypeOf } from "zod";
import { isValidObjectId } from "mongoose";

const todoBody = object({
  title: string({ required_error: "Todo title required" }).nonempty().min(5 ,"Todo title can not be less than 5 char"),
  description: string({
    required_error: "Todo description required",
  }).nonempty().min(5 ,"Todo description can not be less than 5 char"),
});

const todoParams = object({
  id: string().refine((id) => isValidObjectId(id), { message: "Invalid id" }),
});

export const createTodoSchema = object({
  body: todoBody,
});
export const updateTodoSchema = object({
  params: todoParams,
  body: todoBody.partial(),
});
export const getTodoParamsSchema = object({
  params: todoParams,
});

export const deleteTodoSchema = object({
  params: todoParams,
});

export type CreateTodoInput = TypeOf<typeof createTodoSchema>["body"];
export type UpdateTodoInput = TypeOf<typeof updateTodoSchema>["body"];
export type GetTodoParams = TypeOf<typeof getTodoParamsSchema>["params"];
