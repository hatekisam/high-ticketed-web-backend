import { Schema, model, Model, Document, Types } from "mongoose";
// import { AdminRole, AdminRoleEnum } from "../interfaces/Account";

export interface IAccount {
  name: string;
  email: string;
  password: string;
  phone: string;
  profile?: string;
  role: "ADMIN" | "EMPLOYEE";
  user?: Types.ObjectId;
}

export interface IAccountMethods {
  toJsonWithoutPassword(): Partial<Document<IAccount>>;
}

type Account = Model<IAccount, Record<string, never>, IAccountMethods>;

const schema = new Schema<IAccount>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    user: { type: Schema.ObjectId },
    role: { type: String },
    profile: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

schema.index({ name: "text", email: "text" });

schema.set("toJSON", {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

schema.method("toJsonWithoutPassword", function toJsonWithoutPassword() {
  const adminObject: any = this.toJSON();
  //   eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...adminWithoutPassword } = adminObject;
  return adminWithoutPassword;
});

const Account = model<IAccount, Account>("Account", schema);

export default Account;
