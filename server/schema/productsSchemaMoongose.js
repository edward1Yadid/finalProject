const mongoose = require("mongoose");
const { Image } = require("./image");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
    enum: ["Gray", "Yellow", "White", "Black", "BlueLight", "Pink", "Blue","Green"],
  },
  category: {
    type: String,
    enum: ["Mens-Clothing", "Womens-Clothing", "Footwear", "Kids-Clothing"],
    required: true,
  },
  subcategory: {
    type: String,
    enum: ["Pants", "Tshirt", `Shose`],
  },
  image: Image,
  gender: {
    type: String,
    enum: ["male", "female", "unisex"],
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  quantity: {
    type: Number,
    default: 1000,
  },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  rating: {
    type: Number,
    min: 1,
    max: 5
    
  }
});
const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
