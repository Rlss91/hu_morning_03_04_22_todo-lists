const Joi = require("joi");

const objectIdRoles = {
  _id: Joi.string().trim().hex().min(24).max(24).required(),
};

module.exports = {
  objectIdRoles,
};
