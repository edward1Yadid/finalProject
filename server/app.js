
const express = require("express");
const rateLimit = require('express-rate-limit');
const app = express();
const cors = require('cors');
const router=require("./routers/router")
const connfig=require("config");
const logger = require("./morgan/logger");
const { connectToDataBase } = require("./db/databaseConnectServices");
const PORT =connfig.get("PORT")
const limiter = rateLimit({
  windowMs: 60 * 1000 * 60 * 24,
  max: 1000, 
  message: 'Too many requests from this IP, please try again after 24 hours'
});
app.use(limiter);
app.use(express.json());
app.use(cors());
app.use(logger);
app.use(router)
app.listen(PORT, async () => {
  console.log(`listening on : http://localhost:${PORT}`);
  await connectToDataBase()
});