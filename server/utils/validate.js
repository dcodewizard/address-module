const Ajv = require('ajv');
const ajv = new Ajv();

module.exports = (schema) => {
  return (req, res, next) => {
    const validate = ajv.compile(schema);
    const ok = validate(req.body);

    if (ok) {
      next();
    } else {
      res.status(400).json({ error: validate.errors });
    }
  };
};
