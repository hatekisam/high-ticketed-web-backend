import { Schema, model } from "mongoose";

interface IRole {
  name: string;
  desc: string;
  email: string;
  message: string;
}

const schema = new Schema<IRole>({
  name: { type: String, required: true },
  desc: { type: String, required: true },
});

schema.set("toJSON", {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Role = model<IRole>("Role", schema);

export default Role;
