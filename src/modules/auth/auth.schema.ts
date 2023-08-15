import { TypeOf, object, string } from "zod";

const userSchema = {
  email: string({
    required_error: "email required",
  }).email({
    message: "Invalid email",
  }).toLowerCase(),

  password: string({
    required_error: "password required",
  }).nonempty({message:"password cann ot be empty"}).min(8 ,"password can not be less than 8 char"),

  username: string({
    required_error: "username required",
  }).nonempty({message:"username can not be empty"})
};

export const logingSchema = object({
  body: object({
    email: userSchema.email,
    password: userSchema.password,
  }),
});

export const registerSchema = object({
  body: object(userSchema),
});

export type LoginInpt = TypeOf<typeof logingSchema>["body"];
export type RegisterInput = TypeOf<typeof registerSchema>["body"];
