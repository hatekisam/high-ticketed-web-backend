import { Schema, model, Model, Document, Types } from "mongoose";
// import { AdminRole, AdminRoleEnum } from "../interfaces/Customer";

export interface ICustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const schema = new Schema<ICustomer>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Customer = model<ICustomer>("Customer", schema);

export default Customer;
