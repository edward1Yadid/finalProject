const express = require("express");
const router = express.Router();
const { User } = require("../../schema/userschemaMoongose");
const { Cart } = require("../../schema/cartSchema");
const { MongoClient, ObjectId } = require("mongodb");
const { createOrder, getAllOrdersByAdmin,changestatusOfOrder } = require("../../models/orders/OrdersDataManager");
const {
  joiOrderCreate,
} = require("../../validation/order/joivlidayioncreateorder");
const config = require("config");
const { authorizationForAccsesUser } = require("../../auth/user");
const { handleError } = require("../../utils/handleErrorProducts");
const discountPercent = 0.1;
const taxRate = 0.07;

const ENVIRONMENT = config.get("NODE_ENV");
let client;
router.post("/:id", authorizationForAccsesUser, async (request, response) => {
  const userID = request.params.id;
  const { _id: userIDfromToken } = request.userAuthorization;
  if (userIDfromToken !== userID) {
    return handleError(response, 403, "Access denied");
  }
  try {
    if (ENVIRONMENT === "development") {
      const DB_URI =        process.env.MONGODB_URI || "mongodb://localhost:27017/webstore";
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
    await client.connect();
    const db = client.db();

        // Find the user by ID in the User collection
    const user = await User.findById(userID);
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
      // Find the user's cart by user ID
    const detailsCart = await Cart.findOne({ user: userID });
    if (!detailsCart) {
      return response.status(404).json({ error: "Cart not found" });
    }
    const cart_id = detailsCart?._id;
      // Define aggregation pipeline to calculate total price of items in the cart
    const pipeline = [
      { $match: { _id: cart_id } },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "product_details",
        },
      },
      { $unwind: "$product_details" },
      {
        $addFields: {
          "items.quantity": { $toDouble: "$items.quantity" },
          "product_details.price": { $toDouble: "$product_details.price" },
        },
      },
      {
        $group: {
          _id: "$_id",
          total_price: {
            $sum: {
              $multiply: ["$items.quantity", "$product_details.price"],
            },
          },
        },
      },
    ];
      // Execute aggregation pipeline to get total price of the cart
    const result = await db.collection("carts").aggregate(pipeline).toArray();

    if (result.length === 0) {
      return response.status(404).json({ error: "Cart not found" });
    }
        // Calculate final total price including discounts and taxes
    let totalPrice = result[0].total_price;
    totalPrice = totalPrice * (1 - discountPercent) * (1 + taxRate);

        // Map products in the cart to appropriate format for order creation
    const products = detailsCart.items.map((item) => ({
      product: item.product.toString(),
      quantity: item.quantity,
    }));

      // Create order object
    let order = {
      user: new ObjectId(userID).toString(),
      products: products.map((item) => ({
        product: new ObjectId(item.product).toString(),
        quantity: item.quantity,
      })),
      totalPrice,
    };
// Validate order using Joi schema
    const { error } = joiOrderCreate(order);
    if (error) {
      return response.status(400).json({ error: error.details[0].message });
    }

      // Update product stock levels in the database
    for (let i = 0; i < products.length; i++) {
      await db
        .collection("products")
        .updateOne(
          { _id: new ObjectId(products[i].product) },
          { $inc: { stock: -products[i].quantity } }
        );
    }
     // Create new order in the database
    const newOrder = await createOrder(userID, products, totalPrice);
       // Delete user's cart after order creation
    await Cart.deleteOne({ user: userID });
    response.status(200).send(newOrder);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: "An error occurred" });
  } finally {
        // Close MongoDB client connection in all cases
    await client.close();
  }
});

router.get("/manage", authorizationForAccsesUser, async (request, response) => {

  const { isAdmin } = request.userAuthorization;

  if (!isAdmin) {
    return handleError(response, 403, "Access denied");
  }

  try {
    const orders = await getAllOrdersByAdmin();
    if (!orders) {
      return response.status(404).json({ error: "Orders not found" });
    }
    response.status(200).send(orders);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: "An error occurred" });
  }
});

router.patch("/manage/status", authorizationForAccsesUser, async (request, response) => {
  const { isAdmin } = request.userAuthorization;
  if (!isAdmin) {
    return handleError(response, 403, "Access denied");
  }

  try {
    const { orderID } = request.body;
    const changeStatus = await changestatusOfOrder(orderID);
    if (!changeStatus) {
      return response.status(404).json({ error: "Order not found" });
    }
    response.status(200).send(changeStatus);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: "An error occurred" });
  }
});


module.exports = router;
