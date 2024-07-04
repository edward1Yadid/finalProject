const mongoose = require('mongoose');
const { Image } = require('./image');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category_id: {
    type: Number,
    required: true,
    unique: true
  },
  image: Image,
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

categorySchema.pre('save', async function(next) {
  if (!this.isNew) return next();

  try {

    const highestCategory = await Category.findOne({}, {}, { sort: { 'category_id': -1 } });
    const highestId = highestCategory ? highestCategory.category_id : 0;
    
    this.category_id = highestId + 1000;
    next();
  } catch (error) {
    next(error);
  }
});
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
