import * as Joi from 'joi';

const joi = Joi.object({
  PORT: Joi.number().required().port(),
  NODE_ENV: Joi.string().required().valid('dev', 'prod'),
  MYSQL_URL: Joi.string().required().uri(),
});

export default joi;
