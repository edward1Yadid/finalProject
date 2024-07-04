const {
  createNewSubCategory,
} = require("../../models/subcategoires/subcategoriesDataManager");
const { handleErrorSubCategories } = require("../../utils/handleErrorProducts");
const { normalizeSubCategoryRaw } = require("./normalizeSubCategoryRaw");
const {
  joiSubCategoryCreateservices,
} = require("../../validation/subcaregories/subcategoriesvalidationservices");
const express = require("express");
const router = express.Router();
///handlerror
router.post("/", async (request, response) => {
  try {
    let subcategoryFromAdmin = request.body;
    const { error } = joiSubCategoryCreateservices(subcategoryFromAdmin);
    if (error) {
      return handleErrorSubCategories(
        response,
        error.status || 500,
        error.message
      );
    }
    let normalizedsubCategories = await normalizeSubCategoryRaw(
      subcategoryFromAdmin
    );
    const newSubCategory = await createNewSubCategory(normalizedsubCategories);
    return response.status(200).send(newSubCategory);
  } catch (error) {
    return handleErrorSubCategories(
      response,
      error.status || 500,
      error.message
    );
  }
});

module.exports = router;
