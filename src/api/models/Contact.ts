import { Schema, model } from "mongoose";

export interface IContact {
  name: string;
  subject: string;
  email: string;
  message: string;
}

const schema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    subject: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

schema.set("toJSON", {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Contact = model<IContact>("Contact", schema);

export default Contact;
