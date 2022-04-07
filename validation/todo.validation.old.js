const Joi = require("joi");

const todoCreateRoles = {
  title: Joi.string().min(2).max(255).trim().required(),
  createdBy: Joi.string().hex().length(24).required(),
  tasks: Joi.array()
    .items(
      Joi.object({
        cmd: Joi.string().min(2).max(255).trim().required(),
        isDone: Joi.boolean().required(),
      })
    )
    .required(),
};

const todoCreateSchema = Joi.object(todoCreateRoles);

module.exports = {
  todoCreateSchema,
};
