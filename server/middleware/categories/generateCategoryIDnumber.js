
const lodash = require("lodash");
const Category = require("../../schema/categorySchemaMongoose");
const { handleBadRequest } = require("../../utils/handleErrorProducts");


const generateCategoryIDnumber = async () => {
  try {
    const random = lodash.random(1000000, 9000000);
    const category = await Category.findOne({ category_id: random });
    if (category) {
      return generateCategoryIDnumber();
    }
    return random;
  } catch (error) {
    return handleBadRequest("generateCategoryIDnumber", error.message);
  }
};

exports.generateCategoryIDnumber=generateCategoryIDnumber

