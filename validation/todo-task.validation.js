const Joi = require("joi");
const GeneralRoles = require("./general.validation");

const taskCmdRoles = {
  cmd: Joi.string().min(2).max(255).trim().required(),
};

const taskIsDoneRoles = {
  isDone: Joi.boolean().required(),
};

const taskCreateSchema = Joi.object({
  ...GeneralRoles.objectIdRoles,
  ...taskCmdRoles,
  ...taskIsDoneRoles,
});

module.exports = {
  taskCmdRoles,
  taskIsDoneRoles,
  taskCreateSchema,
};
