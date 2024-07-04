const Joi = require("joi");

export const filterProductByUserjoivalidation = Joi.object({
  minPrice: Joi.string()
    .pattern(/^\d{2,3}\.\d{2}$/)
    .message("minPrice must be valid, e.g., 100.00")
    .required()
    .label("minPrice"),
    
  maxPrice: Joi.string()
    .pattern(/^\d{2,3}\.\d{2}$/)
    .message("maxPrice must be valid, e.g., 100.00 and higher the minPrice")
    .required()
    .label("maxPrice")
    .custom((value, helpers) => {
      const { minPrice } = helpers.state.ancestors[0];
      if (parseFloat(value) <= parseFloat(minPrice)) {
        return helpers.message('"maxPrice" must be greater than or equal to "minPrice"');
      }
      return value;
    }),
  
    Color: Joi.string()
    .valid("Gray", "Yellow", "White", "Black", "BlueLight", "Pink", "Blue")
    .required()
    .label("Color"),
  
    Subcategory: Joi.string()
    .valid("Tshirt", "Pants","Shose")
    .required()
    .label("Subcategory"),
    Category: Joi.string()
    .valid("Mens-Clothing", "Womens-Clothing", "Footwear", "Kids-Clothing")
    .required()
    .label("Category"),
    Rating: Joi.number().integer().min(1).max(5).required()
    
});
