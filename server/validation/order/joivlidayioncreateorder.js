const Joi = require('joi');
const joiOrderCreate = (order) => {
    const orderValidationSchema = Joi.object({
        user: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
        products: Joi.array().items(
          Joi.object({
            product: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
            quantity: Joi.number().required().min(1),
          })
        ).required(),
        totalPrice: Joi.number().required().min(0),
        status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered').default('pending'),
        createdAt: Joi.date().default(Date.now)
      });

      return orderValidationSchema.validate(order)

}




module.exports = {
    joiOrderCreate
};
