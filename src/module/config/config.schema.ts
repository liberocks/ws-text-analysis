import * as Joi from 'joi';

export const ConfigJoiSchema = Joi.object({
  PORT: Joi.number().required(),
  ES_URL: Joi.string()
    .uri()
    .required(),
  ES_HOST: Joi.string().required(),
  ES_PORT: Joi.number().required(),
}).options({ stripUnknown: true });
