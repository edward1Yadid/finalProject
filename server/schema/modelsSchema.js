const mongoose = require('mongoose');



const modelSchema = new  mongoose.Schema({
  name: String,
  origin: String,
  height: Number,
  image: {
    url: String,
    alt: String
  },
  description: String
});

const Model = mongoose.model('models', modelSchema);

module.exports = Model;
