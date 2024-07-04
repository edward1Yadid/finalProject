


const config=require("config")
const validatiorLibrary=config.get("VALIDATION")
const joisubcategoriesCreate = require("./joisubcategoriesCreate")



const joiSubCategoryCreateservices=(SubCategory)=>{
if(validatiorLibrary==="Joi")return joisubcategoriesCreate(SubCategory)

}
exports.joiSubCategoryCreateservices=joiSubCategoryCreateservices