import Joi from "joi";

const RegisterSchemaValidation = Joi.object({

      first: Joi.string()
        .min(2)
        .max(250)
        .required()
        .pattern(/^[a-zA-Z\s!?._-]+$/)
        .message("First name must be a string")
        .label("First Name"),

      middle: Joi.string()
        .min(2)
        .max(250)
        .allow("")
        .pattern(/^[a-zA-Z\s!?._-]+$/)
        .message("Middle name must be a string")
        .label("Middle Name"),

      last: Joi.string()
        .min(2)
        .max(250)
        .required()
        .pattern(/^[a-zA-Z\s!?._-]+$/)
        .message("Last name must be a string")
        .label("Last Name"),


  phone: Joi.string()
    .pattern(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
    .message("Please enter a valid phone number")
    .required()
    .label("Phone"),

  email: Joi.string()
    .pattern(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    .message('User "mail" must be a valid email')
    .required()
    .label("Email"),

  password: Joi.string()
    .pattern(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
    )
    .message(
      "Password: 7<=<20 chars, >=1 uppercase, >=1 lowercase, >=1 number, >=1 from !@#$%^&*-"
    )
    .required()
    .label("Password"),

  state: Joi.string().allow("").label("State"),

  country: Joi.string().min(2).max(256).required().label("Country"),

  city: Joi.string().min(2).max(256).required().label("City"),

  street: Joi.string().min(2).max(256).required().label("Street"),

  houseNumber: Joi.number().required().label("House Number"),

  zip: Joi.number().label("Zip"),
});

export default RegisterSchemaValidation;
