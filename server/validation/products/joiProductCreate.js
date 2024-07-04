const Joi = require("joi");

const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const productValidation = (product) => {
  const productValidationSchema = Joi.object({
    title: Joi.string().min(2).max(256).regex(/^[a-zA-Z\s\-'’]+$/).required().label("Title"),
    description: Joi.string().min(2).max(2048).required().label("Description"),
    price: Joi.string()
    .regex(/^\d{2,3}\.\d{2}$/)
      .message("Price must be valid, e.g., 100.00")
      .required()
      .label("Price"),
      discount: Joi.string()
      .regex(/^\d{2,3}\.\d{2}$/)
      .message(" discount price must be valid")
      .required()
      .label("Discount"),
    color: Joi.string()
    .valid("Gray", "Yellow", "White", "Black", "BlueLight", "Pink", "Blue","Green")
    .required()
    .label("Color"),
    category: Joi.string()
      .valid(
        "Mens-Clothing",
        "Womens-Clothing",
        "Footwear",
        "Accessories",
        "Kids-Clothing"
      )
      .required(),
    subcategory: Joi.string().valid("Pants", "Tshirt","Shose"),
    image: Joi.object({
      url: Joi.string()
        .regex(urlRegex)
        .message('product.image "url" must be a valid URL')
        .allow(""),
      alt: Joi.string().min(2).max(256).regex(/^[a-zA-Z\s\-'’]/).required().allow(""),
    }).required(),
    gender: Joi.string().valid("male", "female", "unisex").required(),
  });

  return productValidationSchema.validate(product);
};

module.exports = productValidation;
