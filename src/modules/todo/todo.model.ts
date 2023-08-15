import { prop, getModelForClass, Ref, index, Pre  } from "@typegoose/typegoose";
import { User } from "../user/user.model";
import { HydratedDocument } from "mongoose";

@Pre<Todo>(/^find/,function(){
  this.populate('user','_id username')
})

@index({userId:1})
export class Todo {
  @prop({ required: true, minlength: 5, maxlength: 50, unique: true })
  public title: string;

  @prop({ required: true, minlength: 5, maxlength: 200 })
  public description: string;

  @prop({ required: true, ref: () => User  })
  public user: Ref<User>;

}


export type TodoDocument = HydratedDocument<Todo> ;
export const TodoModel = getModelForClass<typeof Todo>(Todo, {
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
});
