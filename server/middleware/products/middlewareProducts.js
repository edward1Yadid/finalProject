const express = require("express");
const {
  handleErrorProducts,
  handleBadRequestProducts,
  handleError,
} = require("../../utils/handleErrorProducts");
const {
  getAllProducts,
  createNewProduct,
  getProductProfile,
  editProductByAdmin,
  deleteProductByAdmin,
  userLikeProduct,
  fillterdProduct,
  addorremovefromwishlist,
  filterProductUser,
  updateQunatity,
} = require("../../models/profucts/ProductDataManager");
const {
  normalizeProductRaw,
} = require("../../helpers/products/nromalizedProductRaw");
const {
  joiProductCreate,
  productValidationEditservcise,
  productValidationFilterservcise,
} = require("../../validation/products/productValidationServices");
const {
  normalizeProductRawEdit,
} = require("../../helpers/products/normalizedEditProduct");
const { authorizationForAccsesUser } = require("../../auth/user");
const { MongoClient } = require("mongodb");

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    console.log("hehehe");
    let categoires = await getAllProducts();
    return response.send(categoires);
  } catch (error) {
    return handleErrorCategories(response, error.status || 500, error.message);
  }
});

///handlerror
router.get("/filter", async (request, response) => {
  try {
    const { minPrice, maxPrice, Color, Subcategory, Category } = request.query;
    const filterProduct = {
      minPrice,
      maxPrice,
      Color,
      Subcategory,
      Category,
    };
    console.log(filterProduct);
    const { error } = productValidationFilterservcise(filterProduct);
    if (error) {
      return handleErrorProducts(response, error.status, error.message);
    }
    const productFiltered = await filterProductUser(filterProduct);
    return response.send(productFiltered);
  } catch (error) {
    return handleErrorProducts(response, error.status || 500, error.message);
  }
});
///handlerror
router.get("/:categoryID", async (req, res) => {
  try {
    const { categoryID } = req.params;
    const products = await fillterdProduct(categoryID);
    res.status(200).send(products);
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message });
  }
});

///handlerror
router.get("/:id/details", async (request, response) => {
  try {
    const { id: ProductID } = request.params;
    const products = await getProductProfile(ProductID);
    return response.send(products);
  } catch (error) {
    return handleErrorProducts(response, error.status || 500, error.message);
  }
});

///handlerror
router.post("/", authorizationForAccsesUser, async (request, response) => {
  try {
    const { isAdmin } = request.userAuthorization;
    if (!isAdmin) {
      return handleError(response, 403, "Access denied");
    }
    let productFromAdmin = request.body;
    const { error } = joiProductCreate(productFromAdmin);
    if (error) {
      return handleErrorProducts(response, error.status, error.message);
    }
    let normalizedProduct = normalizeProductRaw(productFromAdmin);
    products = await createNewProduct(normalizedProduct);
    return response.status(200).send(products);
  } catch (error) {
    return handleErrorProducts(response, error.status || 500, error.message);
  }
});

///handlerror
// router.put("/:id", authorizationForAccsesUser, async (request, response) => {
//   try {
//     const { isAdmin } = request.userAuthorization;
//     if (!isAdmin) {
//       return handleError(response, 403, "Access denied");
//     }
//     const { id: ProductID } = request.params;
//     let produtFromAdmin = request.body;

//     const { error } = productValidationEditservcise(produtFromAdmin);
//     if (error) {
//       return handleErrorProducts(response, error.status, error.message);
//     }
//     let normalizedProduct = await normalizeProductRawEdit(produtFromAdmin);
//     let products = await editProductByAdmin(ProductID, normalizedProduct);
//     return response.send(products);
//   } catch (error) {
//     return handleErrorProducts(response, error.status || 500, error.message);
//   }
// });

///handlerror
router.delete("/:id", authorizationForAccsesUser, async (request, response) => {
  try {
    const { isAdmin } = request.userAuthorization;
    if (!isAdmin) {
      return handleError(response, 403, "Access denied");
    }
    const { id: ProductID } = request.params;
    const products = await deleteProductByAdmin(ProductID);
    return response.send(products);
  } catch (error) {
    return handleErrorProducts(response, error.status || 500, error.message);
  }
});
///handlerror
router.patch(
  "/:id/wishlist",
  authorizationForAccsesUser,
  async (request, response) => {
    try {
      const { id: ProductID } = request.params;
      const { userID } = request.body;
      const { _id: userIDfromToken } = request.userAuthorization;
      if (userIDfromToken !== userID) {
        return handleError(response, 403, "Access denied");
      }

      const product = await addorremovefromwishlist(userID, ProductID);
      return response.send(product);
    } catch (error) {
      return handleErrorProducts(response, error.status || 500, error.message);
    }
  }
);

///handlerror
router.patch(
  "/:id/favoriteProduct",
  authorizationForAccsesUser,
  async (request, response) => {
    try {
      const { id: ProductID } = request.params;
      const { userID } = request.body;
      const { _id: userIDfromToken } = request.userAuthorization;
      if (userIDfromToken !== userID) {
        return handleError(response, 403, "Access denied");
      }
      const product = await userLikeProduct(userID, ProductID);
      return response.send(product);
    } catch (error) {
      return handleErrorProducts(response, error.status || 500, error.message);
    }
  }
);
router.put(
  "/admin/quantity/:id",
  authorizationForAccsesUser,
  async (request, response) => {
    try {
      const { isAdmin } = request.userAuthorization;
      if (!isAdmin) {
        return handleError(response, 403, "Access denied");
      }
      const { id: ProductID } = request.params;
      const { productQunatity } = request.body;
      if (isNaN(productQunatity)) {
        console.log("Invalid quantity value");
        return;
      }
      const Product = await updateQunatity(ProductID, productQunatity);
      response.send(Product);
    } catch (error) {
      return handleErrorProducts(response, error.status || 500, error.message);
    }
  }
);

const uri = "mongodb://localhost:27017/webstore";
const client = new MongoClient(uri);

router.put("/updateone", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("webstore");
    const productsCollection = db.collection("products");

    const generateRandomValue = () => Math.floor(Math.random() * 5) + 1;
    const products = await productsCollection.find().toArray();
    for (const product of products) {
      await productsCollection.updateOne(
        { _id: product._id },
        {
          $set: {
            rating: generateRandomValue(),
          },
        }
      );
    }

    await client.close();

    res.status(200).send(`${products.length} products updated successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
