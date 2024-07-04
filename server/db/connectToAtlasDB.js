const chalk = require("chalk");
const mongoose = require("mongoose");
const config = require("config");
const { MongoClient } = require("mongodb");


const DB_NAME = config.get("DB_NAME");
const DB_PASSWORD = config.get("DB_PASSWORD");
    const connectTocompassDB=`mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0.kxwl9ix.mongodb.net/WebStore`
const connectToDatabaseAtlas = async () => {
  try {


    await mongoose.connect(connectTocompassDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(
      chalk.bgBlueBright(`Connected to MongoDB Atlas at ${mongoose.connection.host}`)
    );
  } catch (error) {
    console.error(
      chalk.bgRedBright(`Error connecting to MongoDB Atlas: ${error.message}`)
    );
  }
};



module.exports={
  connectToDatabaseAtlas

}