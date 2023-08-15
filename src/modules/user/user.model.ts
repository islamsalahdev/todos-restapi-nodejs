import {  getModelForClass, pre, prop } from "@typegoose/typegoose";
import { HydratedDocument } from "mongoose";
import { hash } from 'argon2';

@pre<User>("save", async function () {
  if ( this.isNew || this.isModified(this.password)) {  
    this.password = await hash(this.password)
  }
})

export class User {
  
  @prop({ required: true })
  public username: string;

  @prop({ unique:true, required: true, lowercase: true })
  public email: string;

  @prop({ required: true ,minlength:8 })
  public  password: string;

  @prop({select:false })
  public refreshToken?: string;

}

export type UserDocument = HydratedDocument<User>;
export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
});

