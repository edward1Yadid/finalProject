const express = require("express");
const { getAllModles } = require("../../models/modelsStore/ModelsDataManager");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    let models = await getAllModles();
    return response.send(models);
  } catch (error) {
    return handleErrorCategories(response, error.status || 500, error.message);
  }
});

module.exports = router;
