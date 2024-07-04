

const confing=require("config");
const { connectToDatabaseAtlas } = require("./connectToAtlasDB");
const { connectToCompassDatabase } = require("./connectToLocalDB");
const ENVIRONMENT=confing.get("NODE_ENV")


const  connectToDataBase = async () => {
  if (ENVIRONMENT === "development") {
    const data= await connectToCompassDatabase();
    return data 
  
  } if (ENVIRONMENT === "production") {
    const data= await connectToDatabaseAtlas();
    return data 
  } else {
     new Error(`Unsupported environment: ${ENVIRONMENT}`);

  }
};

exports.connectToDataBase=connectToDataBase