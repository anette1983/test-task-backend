const HttpError = require("../helpers/HttpError");

const validation = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body, { convert: true });
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validation;
