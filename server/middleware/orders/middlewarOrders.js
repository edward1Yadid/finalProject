const express = require("express");
const router = express.Router();
const { User } = require("../../schema/userschemaMoongose");
const { Cart } = require("../../schema/cartSchema");
const { MongoClient, ObjectId } = require("mongodb");
const { createOrder, getAllOrdersByAdmin,changestatusOfOrder } = require("../../models/orders/OrdersDataManager");
const {
  joiOrderCreate,
} = require("../../validation/order/joivlidayioncreateorder");
const { authorizationForAccsesUser } = require("../../auth/user");
const { handleError } = require("../../utils/handleErrorProducts");
const discountPercent = 0.1;
const taxRate = 0.07;
const DB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/webstore";
const client = new MongoClient(DB_URI);
///handle error
router.post("/:id", authorizationForAccsesUser, async (request, response) => {
  const userID = request.params.id;
  const { _id: userIDfromToken } = request.userAuthorization;
  if (userIDfromToken !== userID) {
    return handleError(response, 403, "Access denied");
  }
  try {
    await client.connect();
    const db = client.db();
    const user = await User.findById(userID);

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    const detailsCart = await Cart.findOne({ user: userID });
    if (!detailsCart) {
      return response.status(404).json({ error: "Cart not found" });
    }
    const cart_id = detailsCart._id;
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
    const result = await db.collection("carts").aggregate(pipeline).toArray();

    if (result.length === 0) {
      return response.status(404).json({ error: "Cart not found" });
    }
    let totalPrice = result[0].total_price;
    totalPrice = totalPrice * (1 - discountPercent) * (1 + taxRate);
    const products = detailsCart.items.map((item) => ({
      product: item.product.toString(),
      quantity: item.quantity,
    }));
    let order = {
      user: new ObjectId(userID).toString(),
      products: products.map((item) => ({
        product: new ObjectId(item.product).toString(),
        quantity: item.quantity,
      })),
      totalPrice,
    };

    const { error } = joiOrderCreate(order);
    if (error) {
      return response.status(400).json({ error: error.details[0].message });
    }

    for (let i = 0; i < products.length; i++) {
      await db
        .collection("products")
        .updateOne(
          { _id: new ObjectId(products[i].product) },
          { $inc: { stock: -products[i].quantity } }
        );
    }
    const newOrder = await createOrder(userID, products, totalPrice);
    await Cart.deleteOne({ user: userID });
    response.status(200).send(newOrder);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: "An error occurred" });
  } finally {
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
