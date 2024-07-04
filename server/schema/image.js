const { default: mongoose } = require("mongoose");

const Image = new mongoose.Schema({
    url: {
      type: String,
      match: RegExp(
        /^https:\/\/i\.im\.ge\/\d{4}\/\d{2}\/\d{2}\/[a-zA-Z0-9]+(\.[a-zA-Z0-9-]+)*\.(jpg|jpeg|png|gif)$/
      ),
      trim: true,
    },
    alt: {
      type: String,
      required: true,
      minlength: 2,
      maxLength: 256,
      trim: true,
      lowercase: true,
    }, 
  },
);

exports.Image=Image