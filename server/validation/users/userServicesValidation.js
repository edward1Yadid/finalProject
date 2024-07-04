const config=require("config");
const registerUserVlidation = require("./registerUserValidation");
const loginUserValidation = require("./validateLogin");
const validatiorLibrary=config.get("VALIDATION")

const validateRestration = (user) => {
    if (validatiorLibrary === "Joi") return registerUserVlidation(user);
  };
  
  const validateLogin = (user) => {
    if (validatiorLibrary === "Joi") return loginUserValidation(user);
  };
  

  
  module.exports = {
    validateRestration,
    validateLogin
  };
  