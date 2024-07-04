const Joi = require("joi");

const joisubcategoriesCreate = (SubCategory) => {
  const joivalidationsubcategoriesCreate = Joi.object({
    name: Joi.string()
      .trim()
      .required()
      .min(2)
      .max(50)
      .error(
        new Error(
          "SubCategory name is required and must be between 2 and 50 characters long"
        )
      ),
      subcategory_id: Joi.string()
      .trim().regex(/^[0-9]+$/)

      

      .error(new Error("SubCategory ID is required and must be number")),
    image: Joi.object({
      url: Joi.string()
        .trim()
        .required()
        .regex(
          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
        )
        .error(new Error("Image URL is required and must be a valid URL")),
      alt: Joi.string()
        .trim()
        .required()
        .min(2)
        .max(256)
        .error(
          new Error(
            "Image alt text is required and must be between 2 and 256 characters long"
          )
        ),
    }).required()
   
  });

  return joivalidationsubcategoriesCreate.validate(SubCategory);
};

module.exports = joisubcategoriesCreate;
