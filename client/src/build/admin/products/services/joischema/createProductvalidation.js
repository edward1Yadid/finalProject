const Joi = require("joi");

const urlRegex =  /^https:\/\/i\.im\.ge\/\d{4}\/\d{2}\/\d{2}\/[a-zA-Z0-9]+(\.[a-zA-Z0-9-]+)*\.(jpg|jpeg|png|gif)$/;

export const productValidationSchema = Joi.object({
  title: Joi.string().min(2).max(256).regex(/^[a-zA-Z!-]+$/).required().label("Title"),
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
    .required()
    .label("Category"),
  subcategory: Joi.string().valid("Pants", "Tshirt","Shose").required().label("Subcategory"),

    url: Joi.string()
      .regex(urlRegex)
      .message('Image URL must be a valid URL starting with https://i.im.ge/')
      .allow("")
      .optional()
      .label("ImageURL"),
    alt: Joi.string().min(2).max(256).regex(/^[a-zA-Z\s\-'’]+$/).required().label("ImageAlt"),

  
  gender: Joi.string().valid("male", "female", "unisex").required().label("Gender"),
});
