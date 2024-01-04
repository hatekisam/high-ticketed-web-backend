import { Schema, model, Model, Document, Types } from "mongoose";

export interface IProject {
  name: string;
  type: string;
  customer: Types.ObjectId;
  documents: string[];
  tasks: Types.ObjectId[];
  description: string;
  budget: number;
  timeline: number;
}

const schema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    documents: [{ type: String, required: true }],
    tasks: [{ type: Schema.ObjectId, required: true }],
    budget: { type: Number, required: false },
    timeline: { type: Number, required: false },
    customer: { type: Schema.ObjectId, ref: "Customer" },
  },
  {
    timestamps: true,
  }
);

schema.index({
  name: "text",
});

schema.set("toJSON", {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Project = model<IProject>("Project", schema);

export default Project;
