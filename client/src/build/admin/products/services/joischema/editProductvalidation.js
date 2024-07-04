const Joi = require("joi");
export const productValidationSchemaEdit = Joi.object({
  title: Joi.string().min(2).max(256).regex(/^[a-zA-Z !-]+$/).required().label("Title"),
  description: Joi.string().min(2).max(2048).required().label("Description"),
  price: Joi.string()
    .regex(/^\d{2,3}\.\d{2}$/)
    .message("Price must be valid, e.g., 100.00")
    .required()
    .label("Price"),
    discount: Joi.string()
    .regex(/^\d{2,3}\.\d{2}$/)
    .message("Discount must be valid, e.g., 50.00")
    .optional()
    .label("Discount"),
  color: Joi.string().min(2).max(256).regex(/^[a-zA-Z !-]+$/).required().label("Color"),

});
