
const mongoose = require('mongoose');
const { Product } = require("./productsSchemaMoongose");  
const { User } = require('./userschemaMoongose');  


const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const cartSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true  
    },
    items: [cartItemSchema],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });

  cartSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
  

  const CartItem = mongoose.model('CartItem', cartItemSchema);
  const Cart = mongoose.model('Cart', cartSchema);
  
  module.exports = {
    Cart,
    CartItem
  };