import { Account, User } from "../models";
import bcrypt from "bcryptjs";
import APIError from "../helpers/APIError";
import status from "http-status";
import config from "../../config/config";
import { NewAccount } from "api/interfaces/Account";
import mailer from "../helpers/mailer";

function generateRandomPassword(length: number = 12): string {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%?";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

const becomeUser = async ({
  id,
  username,
}: {
  id: string | undefined;
  username: string;
}) => {
  if (id == undefined)
    throw new APIError(status.UNAUTHORIZED, "You are not logged in");
  const account = await Account.findById(id);
  if (!account)
    throw new APIError(
      status.NOT_FOUND,
      "There is no account with the given id"
    );
  if (account?.user)
    throw new APIError(status.CONFLICT, "You are already a user");
  const newUser = new User({ username: username });
  await newUser.save();
  account.user = newUser.id;
  return account.save();
};

const becomeRecruiter = async (id: string | undefined) => {
  if (id == undefined)
    throw new APIError(status.UNAUTHORIZED, "You are not logged in");
  const account = await Account.findById(id);
  if (!account)
    throw new APIError(
      status.NOT_FOUND,
      "There is no account with the given id"
    );
  if (account.user)
    throw new APIError(status.CONFLICT, "You are already a recruiter");
  // const newCompany = new Company(body);
  // await newCompany.save();
  // // account.company = newCompany.id;
  return await account?.save();
};

const createAccount = async (body: NewAccount) => {
  const existingAccount = await Account.findOne({
    $or: [{ email: body.email }, { phone: body.phone }],
  });
  if (existingAccount) {
    throw new APIError(status.CONFLICT, `Employee already exists`);
  }
  const randomPassword = generateRandomPassword();
  const password = await bcrypt.hash(randomPassword, config.BCRYPT_SALT);
  const newUser = new Account({
    ...body,
    password,
  });
  mailer.sendPasswordEmail(body.email, randomPassword);
  return await newUser.save();
};

const deleteAccount = async (id: string) => {
  await Account.findByIdAndDelete(id);
};

export default {
  createAccount,
  deleteAccount,
  becomeUser,
  becomeRecruiter,
};
