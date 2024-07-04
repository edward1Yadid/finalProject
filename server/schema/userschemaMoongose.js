const  mongoose  = require("mongoose");
const { Name, Address } = require("./generalshcema");

const schemaUser = new mongoose.Schema({
    name: Name,
    phone: {
      type: String,
      required: true,
      match: /0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/,
    },
    email: {
      type: String,
      required: true,
      match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    address: Address,
    isAdmin: { type: Boolean, default: false },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],


  });

  const User=  mongoose.model("user",schemaUser)

  module.exports={
    User
  }