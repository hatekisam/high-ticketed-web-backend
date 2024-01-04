import express from "express";
import { authController } from "../controllers";
import validator from "../middlewares/validator";
import {
  authValidation,
  accountValidations,
} from "../validations";

const router = express.Router();

router.post(
  "/login",
  validator.body(authValidation.loginAccount),
  authController.login
);

// router.post(
//   "/register",
//   validator.body(accountValidations.newAccount),
//   authController.register
// );

router.post(
  "/forgot-password/",
  validator.body(authValidation.forgotPassword),
  authController.forgotPassword
);

// router.post(
//   "/verify-email/",
//   validator.body(accountValidations.verifyEmail),
//   authController.verifyMail
// );

router.post(
  "/new-password",
  validator.body(authValidation.newPassword),
  authController.newPassword
);


router.post(
  "/verify-mail",
  validator.body(authValidation.verifyMail),
  authController.verifyMail
);

router.post(
  "/send-verification-email",
  validator.body(authValidation.sendVerifyMail),
  authController.sendVerifyMail
);

export default router;
