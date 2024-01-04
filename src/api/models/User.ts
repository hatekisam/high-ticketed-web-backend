import { Schema, model, Model, Document, Types } from "mongoose";

export interface IUser {
  username: string;
  about?: string;
  projects: Types.ObjectId[];
  tasks: Types.ObjectId[];
  education: Types.ObjectId[];
  skills: Types.ObjectId[];
  role: Types.ObjectId[];
  languages: Types.ObjectId[];
  awards: Types.ObjectId[];
  files: Types.ObjectId[];
  dob: Date;
  gender: "MALE" | "FEMALE" | "NONE";
  contract: string;
  salary: number;
  hours: number;
  balance: number;
  address: string;
}

type UserModel = Model<IUser, Record<string, never>>;

const schema = new Schema<IUser, UserModel>(
  {
    username: { type: String, required: true },
    about: { type: String, required: false },
    dob: { type: Date },
    projects: [{ type: Schema.ObjectId, ref: "Projects" }],
    tasks: [{ type: Schema.ObjectId, ref: "Task" }],
    awards: [{ type: Schema.ObjectId, ref: "Award" }],
    languages: [{ type: Schema.ObjectId, ref: "Language" }],
    files: [{ type: Schema.ObjectId, ref: "Work" }],
    skills: [{ type: Schema.ObjectId, ref: "Skills" }],
    gender: { type: String, default: "NONE" },
    role: [{ type: Schema.ObjectId, ref: "Role" }],
    contract: { type: String, required: true },
    salary: { type: Number, required: true },
    hours: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

schema.index({
  username: "text",
});

schema.set("toJSON", {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

schema.virtual("role").get(function () {
  return "USER";
});

const User = model<IUser, UserModel>("User", schema);

export default User;
