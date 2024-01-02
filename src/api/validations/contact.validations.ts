import Joi from "joi";

export default {
  createContact: Joi.object({
    name: Joi.string().required(),
    subject: Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
  }),
};
