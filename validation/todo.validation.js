const Joi = require("joi");
const GeneralRoles = require("./general.validation");
const todoTaskValidation = require("./todo-task.validation");

const titleRoles = {
  title: Joi.string().min(2).max(255).trim().required(),
};
const createdByRoles = {
  createdBy: Joi.string().hex().length(24).required(),
};

const tasksRoles = {
  tasks: Joi.array()
    .items(
      Joi.object({
        ...todoTaskValidation.taskCmdRoles,
        ...todoTaskValidation.taskIsDoneRoles,
      })
    )
    .required(),
};

const todoCreateSchema = Joi.object({
  ...titleRoles,
  ...createdByRoles,
  ...tasksRoles,
});

const todoUpdateSchema = Joi.object({
  ...GeneralRoles.objectIdRolesDynamic(),
  ...titleRoles,
});
const todoDeleteSchema = Joi.object({
  ...GeneralRoles.objectIdRolesDynamic(),
});

module.exports = {
  todoCreateSchema,
  todoUpdateSchema,
  todoDeleteSchema,
};
