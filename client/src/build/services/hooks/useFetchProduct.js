import { useCallback, useMemo, useState } from "react";
import {
  createNewProduct,
  editProductDetails,
  getAllProducts,
  getProductProfile,
  filterProducts,
  deleteProductByAdmin,
  addorremoveproductsfromwishlist,
  favoriteProductByUser,
  filterProductsUser,
} from "../axios/Produtcs/productApiAxios";
import { normalizedproduct } from "../../admin/products/services/normalizedProduct/normalizedproduct";
import { normalizedproductEdit } from "../../admin/products/services/normalizedProduct/normalizedProductEdit";
import { useSelector } from "react-redux";
import { useSnackbar } from "../../Providers/SnackBarProvider";

function useFetchProduct() {
  const user = useSelector((appState) => appState.user);
  const [Isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState(null);
  const snackMessage = useSnackbar();
  const requestStatusProducts = (product, products, Isloading, error) => {
    setProduct(product);
    setProducts(products);
    setIsLoading(Isloading);
    setError(error);
  };

  const handleGetAllProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const products = await getAllProducts();
      requestStatusProducts(null, products, false, null);
      snackMessage("Products retrieved successfully.", {
        color: "success",
        variant: "filled",
        duration: 5000,
      });
      return products;
    } catch (error) {
      requestStatusProducts(null, null, false, error);
      snackMessage("Failed to retrieve products. Please try again.", {
        color: "error",
        variant: "filled",
        duration: 5000,
      });
    }
  }, []);

  const handleGetAllProductsFiltered = useCallback(async (categoryID) => {
    setIsLoading(true);
    try {
      const products = await filterProducts(categoryID);
      requestStatusProducts(null, products, false, null);
      snackMessage("Filtered products retrieved successfully.", {
        color: "success",
        variant: "filled",
        duration: 5000,
      });
      return products;
    } catch (error) {
      snackMessage("Failed to retrieve filtered products. Please try again.", {
        color: "error",
        variant: "filled",
        duration: 5000,
      });
      requestStatusProducts(null, null, false, error);
    }
  }, []);

  const handlegetProductDetails = useCallback(async (ProductID) => {
    try {
      setIsLoading(true);
      const product = await getProductProfile(ProductID);
      requestStatusProducts(product, null, false, null);
      snackMessage("Product details retrieved successfully.", {
        color: "success",
        variant: "filled",
        duration: 5000,
      });
      return product;
    } catch (error) {
      requestStatusProducts(null, null, false, error);
      snackMessage("Failed to retrieve product details. Please try again.", {
        color: "error",
        variant: "filled",
        duration: 5000,
      });
    }
  }, []);
  const handlecreateNewProduct = useCallback(async (rawproduct) => {
    try {
      setIsLoading(true);
      let normalizedProduct = normalizedproduct(rawproduct);
      const product = await createNewProduct(normalizedProduct);
      requestStatusProducts(product, null, false, null);
      snackMessage("Product created successfully.", {
        color: "success",
        variant: "filled",
        duration: 5000,
      });
      return product;
    } catch (error) {
      requestStatusProducts(null, null, false, error);
      snackMessage("Failed to create product. Please try again.", {
        color: "error",
        variant: "filled",
        duration: 5000,
      });
    }
  }, []);
  const handleUpdateProduct = useCallback(async (productID, rawproduct) => {
    try {
      setIsLoading(true);
      let normalizedProduct = normalizedproductEdit(rawproduct);
      const product = await editProductDetails(productID, normalizedProduct);
      requestStatusProducts(product, null, false, null);
      snackMessage("Product details updated successfully.", {
        color: "success",
        variant: "filled",
        duration: 5000,
      });
      return product;
    } catch (error) {
      requestStatusProducts(null, null, false, error);
      snackMessage("Failed to update product details. Please try again.", {
        color: "error",
        variant: "filled",
        duration: 5000,
      });
    }
  }, []);

  const handleDeleteProductByAdmin = useCallback(async (productID) => {
    setIsLoading(true);
    try {
      const product = await deleteProductByAdmin(productID);
      requestStatusProducts(product, null, false, null);
      snackMessage("Product deleted successfully.", {
        color: "success",
        variant: "filled",
        duration: 5000,
      });
      return product;
    } catch (error) {
      requestStatusProducts(null, null, false, error);
      snackMessage("Failed to delete product. Please try again.", {
        color: "error",
        variant: "filled",
        duration: 5000,
      });
    }
  }, []);

  const handlewishlistUser = useCallback(async (userID, ProductID) => {
    setIsLoading(true);
    try {
      const product = await addorremoveproductsfromwishlist(userID, ProductID);
      requestStatusProducts(product, null, false, null);
      snackMessage("Product added/removed from wishlist successfully.", {
        color: "success",
        variant: "filled",
        duration: 5000,
      });
      console.log(product);
      return product;
    } catch (error) {
      requestStatusProducts(null, null, false, error);
      snackMessage(
        "Failed to add/remove product from wishlist. Please try again.",
        {
          color: "error",
          variant: "filled",
          duration: 5000,
        }
      );
    }
  }, []);
  const handleGetwishlistproduct = useCallback(async () => {
    try {
      setIsLoading(true);
      const products = await getAllProducts();
      const filteredProducts = products.filter((product) =>
        product.wishlist.includes(user?._id)
      );
      requestStatusProducts(null, filteredProducts, false, null);
      snackMessage("Wishlist products retrieved successfully.", {
        color: "success",
        variant: "filled",
        duration: 5000,
      });
    } catch (error) {
      requestStatusProducts(null, null, null, error);
      snackMessage("Failed to retrieve wishlist products. Please try again.", {
        color: "error",
        variant: "filled",
        duration: 5000,
      });
    }
  });

  const handleFavoriteProductByUser = useCallback(async (userID, ProductID) => {
    try {
      setIsLoading(true);
      const products = await favoriteProductByUser(userID, ProductID);
      requestStatusProducts(null, products, false, null);
      snackMessage("Product favorited successfully.", {
        color: "success",
        variant: "filled",
        duration: 5000,
      });
    } catch (error) {
      requestStatusProducts(null, null, null, error);
      snackMessage("Failed to favorite product. Please try again.", {
        color: "error",
        variant: "filled",
        duration: 5000,
      });
    }
  }, []);

  const handleGetFavoriteproduct = useCallback(async () => {
    try {
      setIsLoading(true);
      const products = await getAllProducts();
      const filteredFavoriteProducts = products.filter((product) =>
        product.likes.includes(user?._id)
      );
      requestStatusProducts(null, filteredFavoriteProducts, false, null);
      snackMessage("Favorite products retrieved successfully.", {
        color: "success",
        variant: "filled",
        duration: 5000,
      });
    } catch (error) {
      requestStatusProducts(null, null, null, error);
      snackMessage("Failed to retrieve favorite products. Please try again.", {
        color: "error",
        variant: "filled",
        duration: 5000,
      });
    }
  }, []);

  const handleGetProductsFilterd = useCallback(async (filterProduct) => {
    setIsLoading(true);
    try {
      const products = await filterProductsUser(filterProduct);
      console.log("products", products);
      requestStatusProducts(null, products, false, null);
      snackMessage("Products retrieved successfully.", {
        color: "success",
        variant: "filled",
        duration: 5000,
      });
      return products;
    } catch (error) {
      requestStatusProducts(null, null, false, error);
      snackMessage("Failed to retrieve products. Please try again.", {
        color: "error",
        variant: "filled",
        duration: 5000,
      });
    }
  }, []);

  const value = useMemo(() => {
    return { product, products, error, Isloading };
  }, [product, products, error, Isloading]);

  return {
    value,
    handleGetAllProducts,
    handlegetProductDetails,
    handleGetAllProductsFiltered,
    handlecreateNewProduct,
    handleUpdateProduct,
    handleDeleteProductByAdmin,
    handlewishlistUser,
    handleGetwishlistproduct,
    handleFavoriteProductByUser,
    handleGetFavoriteproduct,
    handleGetProductsFilterd,
  };
}

export default useFetchProduct;
