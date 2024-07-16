const config = require("config");
const { Cart } = require("../../schema/cartSchema");
const chalk = require("chalk");
const { handleBadRequest } = require("../../utils/handleErrorProducts");
const DB = config.get("DB");

const createCart = async (cartFromClient) => {
  if (DB === "MONGODB") {
    try {
      const cart = new Cart(cartFromClient);
      await cart.save();
      return cart;
    } catch (error) {
      return handleBadRequest("Mongoose", error.status, error.message);
    }
  } else {
    throw new Error("This environment doesn't use a MongoDB server");
  }
};

const getCartByUser = async (userID) => {
  if (DB === "MONGODB") {
    try {
      const cart = await Cart.findOne({ user: userID }).populate(
        "items.product"
      );
      return cart;
    } catch (error) {
      return handleBadRequest("Mongoose", error.status, error.message);
    }
  } else {
    throw new Error("This environment doesn't use a MongoDB server");
  }
};

const removeItemCartByUser = async (userId, productId) => {
  if (DB === "MONGODB") {
    try {
      const cart = await Cart.findOne({ user: userId });
      if (!cart) {
        console.log(chalk.bgBlue("Cart not found in the database"));
        return null;
      }

      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      if (itemIndex > -1) {
        cart.items.splice(itemIndex, 1);
        cart.updatedAt = new Date();
        await cart.save();
        return "Item removed from cart";
      } else {
        console.log(chalk.bgBlue("Item not found in cart"));
        return "Item not found in cart";
      }
    } catch (error) {
      return handleBadRequest("Mongoose", error.status, error.message);
    }
  } else {
    throw new Error("This environment doesn't use a MongoDB server");
  }
};

const getProductQuantityFromCart = async (userID, productID) => {
  if (DB === "MONGODB") {
    try {
      const cart = await Cart.findOne({ user: userID });

      if (!cart) {
        throw new Error(`Cart not found for user ${userID}`);
      }
      const item = cart.items.find(
        (item) => item.product.toString() === productID
      );

      if (!item) {
        throw new Error(`Product with ID ${productID} not found in the cart`);
      }

      return item.quantity;
    } catch (error) {
      return handleBadRequest("Mongoose", error.status, error.message);
    }
  } else {
    throw new Error("This environment doesn't use a MongoDB server");
  }
};
exports.getCartByUser = getCartByUser;
exports.createCart = createCart;
exports.removeItemCartByUser = removeItemCartByUser;
exports.getProductQuantityFromCart = getProductQuantityFromCart;
