const Joi = require("joi");

const objectIdRoles = {
  _id: Joi.string().trim().hex().min(24).max(24).required(),
};

const titleRoles = {
  title: Joi.string().min(2).max(255).trim().required(),
};
const createdByRoles = {
  createdBy: Joi.string().hex().length(24).required(),
};

const taskCmdRoles = {
  cmd: Joi.string().min(2).max(255).trim().required(),
};

const taskIsDoneRoles = {
  isDone: Joi.boolean().required(),
};

const tasksRoles = {
  tasks: Joi.array()
    .items(
      Joi.object({
        ...taskCmdRoles,
        ...taskIsDoneRoles,
      })
    )
    .required(),
};

const todoCreateSchema = Joi.object({
  ...titleRoles,
  ...createdByRoles,
  ...tasksRoles,
});

const taskCreateSchema = Joi.object({
  ...objectIdRoles,
  ...taskCmdRoles,
  ...taskIsDoneRoles,
});

module.exports = {
  todoCreateSchema,
  taskCreateSchema,
};
