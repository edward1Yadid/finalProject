const express =require("express")
const router=express.Router()

const productsRouter=require("../middleware/products/middlewareProducts")
const usersRouter=require("../middleware/users/middlewareUsers")
const categoryRouter=require("../middleware/categories/middlewareCategories")
const subcategoryRouter=require("../middleware/subcategories/middlewareSubCategories")
const cartRouter=require("../middleware/cart/middlewareCart")
const OrdersRouter = require('../middleware/orders/middlewarOrders');
const modelsRouter=require("../middleware/model/middlewareModles")

const { handleError } = require("../utils/handleErrorProducts")


router.use("/users",usersRouter)
router.use("/products",productsRouter)
router.use("/category",categoryRouter)
router.use("/subcategory",subcategoryRouter)
router.use("/cart",cartRouter)
router.use("/order",OrdersRouter)
router.use("/models",modelsRouter)


router.use((req, res) => {
    handleError(res, 404, "Page not found!");
  });
  

module.exports=router