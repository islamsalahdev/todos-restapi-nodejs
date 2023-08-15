import { verify } from "argon2";
import { UnAuthenticationApiError } from "../../errors";
import { User, UserDocument, UserModel } from "./user.model";
import {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import {
  create,
  findOne,
  findOneAndUpdate,
  updateOne,
} from "../../db/db-features";

export const createUser = async (user: User) => {
  return create(UserModel, user);
};

export const validateUser = async (email: string, password: string) => {
  const user = await findOne(UserModel, { email });
  if (!user || !(await verify(user.password, password))) {
    throw new UnAuthenticationApiError("Invalid email or password");
  }
  return user;
};

export const getUserAndUpdate = async (
  filterQuery: FilterQuery<UserDocument>,
  update?: UpdateQuery<UserDocument>
) => {
  return findOneAndUpdate(UserModel, filterQuery, update);
};

export const getUser = async (
  filterQuery: FilterQuery<UserDocument>,
  projection?: ProjectionType<UserDocument>,
  options?: QueryOptions<UserDocument>
) => {
  return findOne(UserModel, filterQuery, projection, {
    lean: true,
    ...(options && options),
  });
};

export const updateUser = async (
  filterQuery: FilterQuery<UserDocument>,
  update?: UpdateQuery<UserDocument> | User,
  options?: QueryOptions<UserDocument>
) => {
  return updateOne(UserModel, filterQuery, update, options);
};
