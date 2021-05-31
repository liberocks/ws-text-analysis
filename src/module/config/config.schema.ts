import * as Joi from 'joi';

export const ConfigJoiSchema = Joi.object({
  PORT: Joi.number().required(),
  ES_URL: Joi.string().required(),
}).options({ stripUnknown: true });
