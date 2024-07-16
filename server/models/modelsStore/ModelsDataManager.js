const Model = require("../../schema/modelsSchema");
const config = require("config");
const DB = config.get("DB");

const getAllModles = async () => {
  if (DB === "MONGODB") {
    try {
      let models = await Model.find();

      return models;
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    throw new Error("This environment doesn't use a MongoDB server");
  }
};

exports.getAllModles=getAllModles