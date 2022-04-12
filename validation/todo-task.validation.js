const Joi = require("joi");
const _ = require("lodash");
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

const createTaskId = (originalId) => {
  const newRole = _.cloneDeep(originalId);
  newRole["_idTask"] = newRole["_id"];
  delete newRole["_id"];
  return newRole;
  // delete Object.assign(newRole, { _idTask: newRole["_id"] })["_id"];
};

const taskUpdateSchema = Joi.object({
  ...GeneralRoles.objectIdRoles, //_id = todo
  ...createTaskId(GeneralRoles.objectIdRoles),
  ...taskCmdRoles,
  ...taskIsDoneRoles,
});

const taskDeleteSchema = Joi.object({
  ...GeneralRoles.objectIdRoles, //_id = todo
  ...createTaskId(GeneralRoles.objectIdRoles),
});

module.exports = {
  taskCmdRoles,
  taskIsDoneRoles,
  taskCreateSchema,
  taskUpdateSchema,
  taskDeleteSchema,
};
