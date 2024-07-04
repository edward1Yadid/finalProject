const SubCategory = require("../../schema/subcategorySchemaMongoose");
const config = require("config");
const DB = config.get("DB");


const createNewSubCategory = async (normalizedCategories) => {
    if (DB === "MONGODB") {
      try {
        let subcategory = new SubCategory(normalizedCategories);
        subcategory = await subcategory.save();
        return subcategory;
      } catch (error) {
        throw new Error(error.message);
      }
    } else {
      throw new Error("This environment doesn't use a MongoDB server");
    }
  };


  exports.createNewSubCategory=createNewSubCategory