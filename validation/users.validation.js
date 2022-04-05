const Joi = require("joi");

const loginRoles = {
  email: Joi.string().email().min(5).max(255).trim().required(),
  password: Joi.string()
    .regex(
      new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{6,}$")
    )
    .required(),
};
//(?=.*[A-Z]) at least one upper case
//(?=.*[a-z]) at least one lower case
//(?=.*[0-9]) at least one digit
//(?=.*[!@#$%^&*()]) at least one of this special characters !@#$%^&*()
//{6,} the password must be at least 6 characters

const signupRoles = {
  ...loginRoles,
  firstname: Joi.string()
    .min(2)
    .max(255)
    .alphanum()
    .trim()
    .regex(new RegExp("^[A-Z][a-zA-Z0-9]+$"))
    .required(),
  lastname: Joi.string()
    .min(2)
    .max(255)
    .alphanum()
    .trim()
    .regex(new RegExp("^[A-Z][a-zA-Z0-9]+$"))
    .required(),
  phone: Joi.string().min(7).max(255).trim(),
};

const signupSchema = Joi.object(signupRoles);
const loginSchema = Joi.object(signupRoles);

module.exports = {
  signupSchema,
  loginSchema,
};
