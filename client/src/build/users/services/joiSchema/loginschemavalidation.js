import Joi from "joi";

export  const schemaLogin = Joi.object({
    email: Joi.string()
      .pattern(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
      .message('user "mail" must be a valid mail')
      .required()
      .label("Email"),

    password: Joi.string()
      .pattern(
        /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
      )
      .message(
        "password: 7<=<20 chars, >=1 uppercase, >=1 lowercase, >=1 number, >=1 from !@#$%^&*-"
      )
      .required()
      .label("Password"),
  });