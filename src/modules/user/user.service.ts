import { verify } from "argon2";
import { UnAuthenticationApiError } from "../../errors";
import { User, UserDocument, UserModel } from "./user.model";
import {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from "mongoose";

export const createUser = async (user: User) => {
  const newUser = await UserModel.create(user);
  return newUser.toJSON();
};

export const validateUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email }).select("+password").exec();
  if (!user || !(await verify(user.password, password))) {
    throw new UnAuthenticationApiError("Invalid email or password");
  }
  return user;
};

export const getUserAndUpdate = async (
  filterQuery: FilterQuery<UserDocument>,
  update?: UpdateQuery<UserDocument>
) => {
  return UserModel.findOneAndUpdate(filterQuery, update, {
    lean: true,
    new: true,
    runValidators: true,
  }).exec();
};

export const getUser = async (
  filter: FilterQuery<UserDocument>,
  projection?: ProjectionType<UserDocument>,
  options?: QueryOptions<UserDocument>
) => {
  return UserModel.findOne(filter, projection, options).exec();
};

export const updateUser = async (
  filterQuery: FilterQuery<UserDocument>,
  update?: UpdateQuery<UserDocument> | User,
  options?: QueryOptions<UserDocument>
) => {
  const result = await UserModel.updateOne(filterQuery, update, {
    ...(options && options),
    runValidators: true,
  });
  return result.modifiedCount >= 1;
};
