const Joi = require("joi");

const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const roleList = ["user", "admin", "moderator", "superuser"];
const genderList = ["male", "female", "other"];

const addSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": `missing required "username" field`,
    "string.empty": `"username" cannot be an empty field`,
  }),
  firstName: Joi.string().required().messages({
    "any.required": `missing required "firstName" field`,
    "string.empty": `"firstName" cannot be an empty field`,
  }),
  lastName: Joi.string().required().messages({
    "any.required": `missing required "lastName" field`,
    "string.empty": `"lastName" cannot be an empty field`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missing required "email" field`,
    "string.empty": `"email" cannot be an empty field`,
    "string.pattern.base": `"email" must be a valid email address`,
  }),
  role: Joi.string()
    .required()
    .valid(...roleList)
    .insensitive()
    .messages({
      "any.required": `missing required "role" field`,
      "string.empty": `"role" cannot be an empty field`,
      "any.only": `Ivalid role`,
    }),
  state: Joi.string()
    .required()
    .valid(...genderList)
    .insensitive()
    .messages({
      "any.required": `missing required "state" field`,
      "string.empty": `"state" cannot be an empty field`,
      "any.only": `Ivalid state`,
    }),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field "favorite"`,
    "string.empty": `"favorite" cannot be an empty field`,
  }),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

module.exports = schemas;
