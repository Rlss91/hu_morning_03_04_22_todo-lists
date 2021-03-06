const Joi = require("joi");

const emailRole = {
  email: Joi.string().email().min(5).max(255).trim().required(),
};
const passwordRole = {
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

const firstnameRole = {
  firstname: Joi.string()
    .min(2)
    .max(255)
    .alphanum()
    .trim()
    .regex(new RegExp("^[A-Z][a-zA-Z0-9]+$"))
    .required(),
};

const lastnameRole = {
  lastname: Joi.string()
    .min(2)
    .max(255)
    .alphanum()
    .trim()
    .regex(new RegExp("^[A-Z][a-zA-Z0-9]+$"))
    .required(),
};

const phoneRole = {
  phone: Joi.string().min(7).max(255).trim(),
};

const recoveryNumberRole = {
  recoveyNumber: Joi.number().min(100000).max(999999).required(),
};

const signupSchema = Joi.object({
  ...emailRole,
  ...passwordRole,
  ...firstnameRole,
  ...lastnameRole,
  ...phoneRole,
});
const loginSchema = Joi.object({ ...emailRole, ...passwordRole });
const forgetPasswordSchema = Joi.object({ ...emailRole });
const recoverPassworSchema = Joi.object({
  ...emailRole,
  ...recoveryNumberRole,
  ...passwordRole,
});

// const validateAsync = (validateSchema, body) => {
//   return validateSchema.validateAsync(body, {
//     abortEarly: false,
//   })
// }

module.exports = {
  signupSchema,
  loginSchema,
  forgetPasswordSchema,
  recoverPassworSchema,
};
