


const config=require("config")
const validatiorLibrary=config.get("VALIDATION")

const joiCategoryCreate=require("./joiCategoryCreate")

const joiCategoryCreateservices=(Category)=>{
if(validatiorLibrary==="Joi")return joiCategoryCreate(Category)

}
exports.joiCategoryCreateservices=joiCategoryCreateservices