const { Image } = require("./image");
const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({

    name: {
      type: String,
      required: true,
      unique: true
    },
    subcategory_id: {
        type: Number,
        required: true,
        auto: true
      },
    image: Image,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  SubCategorySchema.pre('save', async function(next) {
    if (!this.isNew) return next();
  
    try {
  
      const highestSubCategory = await SubCategory.findOne({}, {}, { sort: { "subcategory_id": -1 } })
      const highestId = highestSubCategory ? highestSubCategory.subcategory_id : 0;
      
      this.subcategory_id = highestId + 100;
      next();
    } catch (error) {
      next(error);
    }
  });
  const SubCategory = mongoose.model('SubCategory', SubCategorySchema);
  
  module.exports = SubCategory;