const config = require("config");
const DB = config.get("DB");
const { Product } = require("../../schema/productsSchemaMoongose");
const { Cart } = require("../../schema/cartSchema");
const { MongoClient } = require("mongodb");

const ENVIRONMENT = config.get("NODE_ENV");

const getAllProducts = async () => {
  if (DB === "MONGODB") {
    try {
      const products = await Product.find();
      if (!products || products.length === 0) {
        return Promise.reject("No products found in the database");
      }
      return Promise.resolve(products);
    } catch (error) {
      return Promise.reject(error.message);
    }
  } else {
    return Promise.resolve("This environment doesn't use a MongoDB server");
  }
};
const fillterdProduct = async (category) => {
  if (DB === "MONGODB") {
    try {
      const products = await Product.find({
        category: category,
      });
      if (!products || products.length === 0) {
        throw new Error("No products found in the databases");
      }
      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    return "This environment doesn't use a MongoDB server";
  }
};
const getProductProfile = async (productID) => {
  if (DB === "MONGODB") {
    try {
      const products = await Product.findById(productID);

      if (!products || products.length === 0) {
        return Promise.reject("No products found in the database");
      }
      return Promise.resolve(products);
    } catch (error) {
      return Promise.reject(error.message);
    }
  } else {
    return Promise.resolve("This environment doesn't use a MongoDB server");
  }
};
const createNewProduct = async (normalizedProduct) => {
  if (DB === "MONGODB") {
    try {
      let products = new Product(normalizedProduct);
      products = await products.save();
      return Promise.resolve(products);
    } catch (error) {
      return Promise.resolve(error.message);
    }
  } else {
    return Promise.resolve("This environment doesn't use a MongoDB server");
  }
};
const editProductByAdmin = async (ProcutID, normalizedProduct) => {
  if (DB === "MONGODB") {
    try {
      let products = await Product.findByIdAndUpdate(
        ProcutID,
        normalizedProduct,
        {
          new: true,
        }
      );
      return Promise.resolve(products);
    } catch (error) {
      return Promise.reject(error.message);
    }
  } else {
    return Promise.resolve("This environment doesn't use a MongoDB server");
  }
};
const deleteProductByAdmin = async (productID) => {
  if (DB === "MONGODB") {
    try {
      let products = await Product.findByIdAndDelete(productID);
      let carts = await Cart.find();
      for (let c of carts) {
        const itemIndex = c.items.findIndex(
          (i) => i.product.toString() === productID
        );

        if (itemIndex !== -1) {
          c.items.splice(itemIndex, 1);
          await c.save();
        }
      }
      if (!products) {
        return Promise.reject("No products found in the database");
      }

      return Promise.resolve(products);
    } catch (error) {
      return Promise.reject(error.message);
    }
  } else {
    return Promise.resolve("This environment doesn't use a MongoDB server");
  }
};
const addorremovefromwishlist = async (userID, ProductID) => {
  if (DB === "MONGODB") {
    try {
      const product = await Product.findById(ProductID);

      if (!product) {
        return { error: "Product not found" };
      }
      const index = product.wishlist.indexOf(userID);
      if (index === -1) {
        product.wishlist.push(userID);
      } else {
        product.wishlist.splice(index, 1);
      }

      await product.save();

      return product;
    } catch (error) {
      return { error: error.message };
    }
  } else {
    return Promise.resolve("This environment doesn't use a MongoDB server");
  }
};
const userLikeProduct = async (userID, ProductID) => {
  if (DB === "MONGODB") {
    try {
      const product = await Product.findById(ProductID);
      if (!product) {
        return { error: "Product not found" };
      }
      const index = product.likes.indexOf(userID);
      if (index === -1) {
        product.likes.push(userID);
      } else {
        product.likes.splice(index, 1);
      }
      await product.save();
      return product;
    } catch (error) {
      return { error: error.message };
    }
  } else {
    return Promise.resolve("This environment doesn't use a MongoDB server");
  }
};
const filterProductUser = async (filterProduct) => {
  if (DB === "MONGODB") {
    try {
      let client;

      if (ENVIRONMENT === "development") {
        const DB_URI =
          process.env.MONGODB_URI || "mongodb://localhost:27017/webstore";

        client = new MongoClient(DB_URI);
      } else if (ENVIRONMENT === "production") {
        const DB_PASSWORD = config.get("DB_PASSWORD");
        const DB_NAME = config.get("DB_NAME");
        const connectTocompassDB = `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0.kxwl9ix.mongodb.net/WebStore`;
        client = new MongoClient(connectTocompassDB);
      }

      if (!client) {
        throw new Error(
          "No MongoDB client available for the current environment"
        );
      }

      await client.connect("WebStore");
      const db = client.db();
      const productsCollection = db.collection("products");

      const { minPrice, maxPrice, Color, Subcategory, Category } =
        filterProduct;
      const query = {};

      if (minPrice) {
        query.price = { price: { $gte: minPrice } };
      }

      if (maxPrice) {
        query.price = { price: { $lte: maxPrice } };
      }
      if (Color) {
        query.color = { color: { $eq: Color } };
      }
      if (Subcategory) {
        query.subcategory = { subcategory: { $eq: Subcategory } };
      }
      if (Category) {
        query.category = { category: { $eq: Category } };
      }
      
      if (minPrice && maxPrice) {
        query.price = {
          $gte: minPrice,
          $lte: maxPrice,
        };
        query.color = {
          $eq: Color,
        };
        query.subcategory = {
          $eq: Subcategory,
        };
        query.category = {
          $eq: Category,
        };
      }
      const filteredProducts = await productsCollection.find(query).toArray();
      await client.close();
      return filteredProducts;
    } catch (error) {
      console.error("Error filtering products:", error);
      return { error: error.message };
    }
  } else {
    return Promise.resolve("This environment doesn't use a MongoDB server");
  }
};

const updateQunatity = async (ProductID,productQunatity) => {
  if (DB === "MONGODB") {
    try {

      const delta = 1000 - productQunatity;
      const product = await Product.findByIdAndUpdate(
        ProductID,
        { $inc: { quantity: delta } },
        {
          new: true,
        }
      );
      if (!product) {
        return Promise.reject("No products found in the database");
      }
      return Promise.resolve(product);
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    return "This environment doesn't use a MongoDB server";
  }
};

exports.editProductByAdmin = editProductByAdmin;
exports.getProductProfile = getProductProfile;
exports.getAllProducts = getAllProducts;
exports.createNewProduct = createNewProduct;
exports.deleteProductByAdmin = deleteProductByAdmin;
exports.userLikeProduct = userLikeProduct;
exports.fillterdProduct = fillterdProduct;
exports.addorremovefromwishlist = addorremovefromwishlist;
exports.filterProductUser = filterProductUser;
exports.updateQunatity=updateQunatity
