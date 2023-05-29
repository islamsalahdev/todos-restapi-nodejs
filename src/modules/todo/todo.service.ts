import type { FilterQuery, ProjectionType, UpdateQuery } from "mongoose";
import { Todo, TodoDocument, TodoModel } from "./todo.model";

export const createTodo = async (todo: Todo) => {
  return (await TodoModel.create(todo)).toJSON();
};

export const getTodos = async (
  filterQuery: FilterQuery<TodoDocument>,
  projection?: ProjectionType<Todo>
) => {
  return TodoModel.find(filterQuery, projection, {
    lean: true,
    sort:'-createdAt'
  }).exec();
};

export const getTodo = async (
  filterQuery: FilterQuery<TodoDocument>,
  projection?: ProjectionType<Todo>
) => {
  return TodoModel.findOne(filterQuery, projection, {
    lean: true,
  }).exec();
};

export const getTodoAndUpdate = async (
  filterQuery: FilterQuery<TodoDocument>,
  update?: UpdateQuery<TodoDocument> | Todo
) => {
  return TodoModel.findOneAndUpdate(filterQuery, update, {
    lean: true,
    new: true,
    runValidators: true,
  }).exec();
};

export const deleteTodo = async (filterQuery: FilterQuery<TodoDocument>) => {
  const result = await TodoModel.deleteOne(filterQuery);
  return result.deletedCount >= 1;
};
