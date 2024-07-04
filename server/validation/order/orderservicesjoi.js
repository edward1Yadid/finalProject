
const config=require("config")
const validatiorLibrary=config.get("VALIDATION")
const {joiOrderCreate}=require("../order/joivlidayioncreateorder")
const joiOrderCreateservices=(order)=>{
if(validatiorLibrary==="Joi")return joiOrderCreate(order)
}
exports.joiOrderCreateservices=joiOrderCreateservices