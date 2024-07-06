const express = require("express");
const router = express.Router();
const joicartvalidation = require("../../validation/cart/joicartvalidation");
const { Cart } = require("../../schema/cartSchema");
const { handleErrorCartItem, handleError } = require("../../utils/handleErrorProducts");
const {
  createCart,
  getCartByUser,
  removeItemCartByUser,
  getProductQuantityFromCart,
} = require("../../models/cart/CartDataManager");
const { authorizationForAccsesUser } = require("../../auth/user");


router.post("/:id/add",authorizationForAccsesUser, async (request, response) => {
  const { id: userID } = request.params;
  const { items } = request.body;

  const { _id:userIDfromToken } = request.userAuthorization;
  if (userIDfromToken !==userID) {
    return handleError(response, 403, "Access denied");
  }

  try {
    const { error } = joicartvalidation({ items });
    if (error) {
      return handleErrorCartItem(response, 400, error.message);
    }
    let cart = await Cart.findOne({ user: userID });
    if (!cart) {
      const cartFromClient = { user: userID, items };
      cart = await createCart(cartFromClient);
    } else {
      items.forEach(({ product, quantity }) => {
        const cartItem = cart.items.find(
          (item) => item.product.toString() === product
        );
        if (cartItem) {
          cartItem.quantity = quantity;
          if (cartItem.quantity <= 0) {
            cart.items = cart.items.filter(
              (item) => item.product.toString() !== product
            );
          }
        } else {
          if (quantity > 0) {
            const newCartItem = {
              product: product,
              quantity: quantity,
            };
            cart.items.push(newCartItem);
          }
        }
      });
    }
    await cart.save();
    response.status(200).json(cart);
  } catch (error) {
    return handleErrorCartItem(response, 400, error.message);
  }
});

router.put("/:id/update",authorizationForAccsesUser, async (request, response) => {
  const { userID, productID, newQuantity } = request.body;
  try {
    const { _id:userIDfromToken } = request.userAuthorization;
    if (userIDfromToken !==userID) {
      return handleError(response, 403, "Access denied");
    }
    const updatedCart = await Cart.findOneAndUpdate(
      { user: userID, 'items.product': productID }, 
      { $set: { 'items.$.quantity': newQuantity } }, 
      { new: true } 
    );
    if (!updatedCart) {
      return handleErrorCartItem(response, 404, 'Cart not found for this user.');
    }
    response.status(200).json({ message: 'Quantity updated successfully.' });
  } catch (error) {
    return handleErrorCartItem(response, 400, error.message);
  }
});

router.delete("/remove",authorizationForAccsesUser, async (request, response) => {

  const {userID,productID} = request.body; 
  
  const { _id:userIDfromToken } = request.userAuthorization;
  if (userIDfromToken !==userID) {
    return handleError(response, 403, "Access denied");
  }

  try {
    const deletedCart = await removeItemCartByUser(userID, productID);
    return response.send(deletedCart)
  } catch (error) {
    handleErrorCartItem(response, 400, error.message);
  }
});

router.get("/:id",authorizationForAccsesUser, async (request, response) => {

  
  try {
    const { id: userID } = request.params;
    const { _id:userIDfromToken } = request.userAuthorization;
    if (userIDfromToken !==userID) {
      return handleError(response, 403, "Access denied");
    }
    const cart = await getCartByUser(userID);
    if (!cart) {
      return 
    }
    response.status(200).json(cart);
  } catch (error) {
    return handleError(response, 500, error.message);
  }
});


router.get("/:id/:productID",authorizationForAccsesUser,async(request, response)=>{
  try {
    const { id: userID,productID:productID } = request.params;
    const { _id:userIDfromToken } = request.userAuthorization;

    if (userIDfromToken !==userID) {
      return handleError(response, 403, "Access denied");
    }

    const quantity = await getProductQuantityFromCart(userID,productID);
    response.status(200).json(quantity);
  } catch (error) {
    return handleError(response, 500, error.message);
  }
})


module.exports = router;
