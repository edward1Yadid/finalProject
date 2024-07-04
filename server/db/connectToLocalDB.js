const chalk = require("chalk");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const DB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/webstore";


async function connectToCompassDatabase() {
  try {
    await mongoose.connect(DB_URI);
    console.log(chalk.bgBlueBright(`Connected to MongoDB at ${mongoose.connection.host}`));
  } catch (error) {
    console.error(chalk.bgRedBright(`Error connecting to MongoDB: ${error.message}`));

    throw error;
  }
}



module.exports={
  connectToCompassDatabase,

}
