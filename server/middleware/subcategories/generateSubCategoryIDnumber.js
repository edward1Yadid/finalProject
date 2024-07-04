const lodash = require("lodash");
const SubCategory = require("../../schema/subcategorySchemaMongoose");


const generateSubCategoryIDnumber = async () => {
  try {
    let random;
    let subcategory;
    do {
      random = lodash.random(1, 999);
      subcategory = await SubCategory.findOne({ subcategory_id: random });
    } while (subcategory);
    return random;
  } catch (error) {
    throw new Error(`Error in generateSubCategoryIDnumber: ${error.message}`);
  }
};

exports.generateSubCategoryIDnumber = generateSubCategoryIDnumber;
