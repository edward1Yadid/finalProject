
const config=require("config")
const validatiorLibrary=config.get("VALIDATION")

const productValidation=require("./joiProductCreate")
const productValidationEdit=require("./joiProductEdit")
const productValidationFilter=require("./joiProductFilter")
const joiProductCreate=(product)=>{
if(validatiorLibrary==="Joi")return productValidation(product)

}
const productValidationEditservcise=(product)=>{
    if(validatiorLibrary==="Joi")return productValidationEdit(product)
}
const productValidationFilterservcise=(filterProduct)=>{
    if(validatiorLibrary==="Joi")return productValidationFilter(filterProduct)
}




exports.joiProductCreate=joiProductCreate
exports.productValidationEditservcise=productValidationEditservcise
exports.productValidationFilterservcise=productValidationFilterservcise