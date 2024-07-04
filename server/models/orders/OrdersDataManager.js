const config = require("config");
const DB = config.get("DB");
const { Order } = require("../../schema/orderSchema");

const createOrder = async (userID, productsID, totalPrice) => {
  if (DB === "MONGODB") {
    try {
      const order = new Order({
        user: userID,
        products: productsID,
        totalPrice,
        message: "Order created successfully dude",
      });
      await order.save();

      return order;
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    throw new Error("This environment doesn't use a MongoDB server");
  }
};

const getAllOrdersByAdmin = async () => {
  if (DB === "MONGODB") {
    try {
      const orders = Order.find();

      return orders;
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    throw new Error("This environment doesn't use a MongoDB server");
  }
};
const changestatusOfOrder = async (orderID) => {
  if (DB === "MONGODB") {
    try {
      const order = await Order.findByIdAndUpdate(
        orderID,
        { status: "processing" },
        { new: true }
      );

      return order;
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    throw new Error("This environment doesn't use a MongoDB server");
  }
};


exports.createOrder = createOrder;
exports.getAllOrdersByAdmin=getAllOrdersByAdmin
exports.changestatusOfOrder=changestatusOfOrder
