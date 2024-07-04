const Category = require("../../schema/categorySchemaMongoose");
const config = require("config");
const DB = config.get("DB");

const getAllCategories = async () => {
  if (DB === "MONGODB") {
    try {
      let categories = await Category.find();

      return categories;
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    throw new Error("This environment doesn't use a MongoDB server");
  }
};



const createNewCategory = async (normalizedCategories) => {
  if (DB === "MONGODB") {
    try {
      let category = new Category(normalizedCategories);
      category = await category.save();
      return category;
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    throw new Error("This environment doesn't use a MongoDB server");
  }
};

exports.createNewCategory = createNewCategory;
exports.getAllCategories = getAllCategories;