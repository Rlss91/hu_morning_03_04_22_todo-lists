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
  ...GeneralRoles.objectIdRolesDynamic(),
  ...taskCmdRoles,
  ...taskIsDoneRoles,
});

// const createTaskId = (originalId) => {
//   const newRole = _.cloneDeep(originalId);
//   newRole["_idTask"] = newRole["_id"];
//   delete newRole["_id"];
//   return newRole;
//   // delete Object.assign(newRole, { _idTask: newRole["_id"] })["_id"];
// };

const taskUpdateSchema = Joi.object({
  ...GeneralRoles.objectIdRolesDynamic(), //_id = todo
  ...GeneralRoles.objectIdRolesDynamic("_idTask"),
  ...taskCmdRoles,
  ...taskIsDoneRoles,
});

const taskDeleteSchema = Joi.object({
  ...GeneralRoles.objectIdRolesDynamic(), //_id = todo
  ...GeneralRoles.objectIdRolesDynamic("_idTask"),
});

module.exports = {
  taskCmdRoles,
  taskIsDoneRoles,
  taskCreateSchema,
  taskUpdateSchema,
  taskDeleteSchema,
};
