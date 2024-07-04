const Joi = require('joi');

const cartItemValidationSchema = Joi.object({
  product: Joi.string().required(), 
  quantity: Joi.number().integer().min(1).required()
});

const cartValidationSchema = Joi.object({
  items: Joi.array().items(cartItemValidationSchema).required()
});

const joicartvalidation = (cartFromClient) => {
  return cartValidationSchema.validate(cartFromClient);
};

module.exports = joicartvalidation;
