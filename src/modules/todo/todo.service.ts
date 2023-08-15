import type { FilterQuery, ProjectionType, UpdateQuery } from "mongoose";
import { Todo, TodoDocument, TodoModel } from "./todo.model";
import {
  create,
  deleteOne,
  findAll,
  findOne,
  findOneAndUpdate,
} from "../../db/db-features";

export const createTodo = async (todo: Todo) => {
  return create<Todo>(TodoModel, todo);
};

export const getTodo = async (
  filterQuery: FilterQuery<TodoDocument>,
  projection?: ProjectionType<Todo>
) => {
  return findOne(TodoModel, filterQuery, projection, {
    lean: true,
  });
};

export const getTodos = async (
  filterQuery: FilterQuery<TodoDocument>,
  projection?: ProjectionType<Todo>
) => {
  return findAll<Todo>(TodoModel, filterQuery, projection);
};

export const getTodoAndUpdate = async (
  filterQuery: FilterQuery<TodoDocument>,
  update?: UpdateQuery<TodoDocument> | Todo
) => {
  return findOneAndUpdate<Todo>(TodoModel, filterQuery, update);
};

export const deleteTodo = async (filterQuery: FilterQuery<TodoDocument>) => {
  return deleteOne<Todo>(TodoModel, filterQuery);
};
