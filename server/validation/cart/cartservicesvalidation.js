

const config=require("config")
const joicartvalidation = require("./joicartvalidation")


const validatiorLibrary=config.get("VALIDATION")

const validateCartItem=(cartFromClien)=>{
    if(validatiorLibrary==="Joi")return joicartvalidation(cartFromClien)
    
    }
    exports.validateCartItem=validateCartItem

