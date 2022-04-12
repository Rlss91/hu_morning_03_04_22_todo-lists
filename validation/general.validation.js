const Joi = require("joi");

const objectIdRoles = {
  _id: Joi.string().trim().hex().min(24).max(24).required(),
};

const objectIdRolesDynamic = (keyName = "_id") => {
  const newRole = _.cloneDeep(objectIdRoles);
  if (keyName === "_id") {
    return newRole;
  } else {
    newRole[keyName] = newRole["_id"];
    delete newRole["_id"];
    return newRole;
  }
  // delete Object.assign(newRole, { _idTask: newRole["_id"] })["_id"];
};

module.exports = {
  objectIdRolesDynamic,
};
