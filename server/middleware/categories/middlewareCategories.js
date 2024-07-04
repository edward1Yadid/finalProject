const {
  createNewCategory,
  getAllCategories,
} = require("../../models/category/CategotyDataManager");
const { handleErrorCategories } = require("../../utils/handleErrorProducts");
const {
  joiCategoryCreateservices,
} = require("../../validation/categories/categoryValidationServices");
const { normalizeCategoryRaw } = require("./normalizeCategoryRaw");
const express = require("express");
const router = express.Router();

//handlerrror
router.get("/", async (request, response) => {
  try {
    let categoires = await getAllCategories();
    return response.send(categoires);
  } catch (error) {
    return handleErrorCategories(response, error.status || 500, error.message);
  }
});
//handlerrror
router.post("/", async (request, response) => {
  try {
    let categoryFromAdmin = request.body;
    const { error } = joiCategoryCreateservices(categoryFromAdmin);
    if (error) {
      return handleErrorCategories(
        response,
        error.status || 500,
        error.message
      );
    }
    let normalizedCategories = await normalizeCategoryRaw(categoryFromAdmin);
    const newCategory = await createNewCategory(normalizedCategories);
    return response.status(200).send(newCategory);
  } catch (error) {
    return handleErrorCategories(response, error.status || 500, error.message);
  }
});

module.exports = router;
