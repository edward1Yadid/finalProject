import axios from "../axios";
const UniqeToken = localStorage.getItem("token");
export const getAllProducts = async () => {
  try {
    const prespone = await axios.get(`/products`);

    const { data } = prespone;
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
export const filterProducts = async (category) => {
  try {
    const response = await axios.get(`/products/${category}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getProductProfile = async (productID) => {
  try {
    const prespone = await axios.get(`/products/${productID}/details`);
    const { data } = prespone;
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
export const createNewProduct = async (product) => {
  try {
    axios.defaults.headers.common["x-auth-token"] = `${UniqeToken}`;
    console.log(UniqeToken);
    const prespone = await axios.post(`/products`, product);
    const { data } = prespone;
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
export const editProductDetails = async (productID, product) => {
  try {
    axios.defaults.headers.common["x-auth-token"] = `${UniqeToken}`;
    const prespone = await axios.put(`/products/${productID}`, product);
    const { data } = prespone;
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
export const deleteProductByAdmin = async (productID) => {
  axios.defaults.headers.common["x-auth-token"] = `${UniqeToken}`;
  try {
    const prespone = await axios.delete(`/products/${productID}`);
    const { data } = prespone;
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
export const addorremoveproductsfromwishlist = async (userID, ProductID) => {
  try {
    axios.defaults.headers.common["x-auth-token"] = `${UniqeToken}`;
    const response = await axios.patch(`/products/${ProductID}/wishlist`, {
      userID,
    });
    const { data } = response;
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
export const favoriteProductByUser = async (userID, ProductID) => {
  try {
    axios.defaults.headers.common["x-auth-token"] = `${UniqeToken}`;
    const response = await axios.patch(
      `/products/${ProductID}/favoriteProduct`,
      { userID }
    );
    const { data } = response;
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const filterProductsUser = async (filterProduct) => {
  try {
    const response = await axios.get("/products/filter", {
      params: filterProduct,
    });

    const { data } = response;
    return data;
  } catch (error) {
    console.error("Error in handleGetProductsFilterd:", error);
    return Promise.reject(error.message);
  }
};

export const UpdateQunatity=async(productID,productQunatity)=>{

  try {

    axios.defaults.headers.common["x-auth-token"] = `${UniqeToken}`;
    const prespone = await axios.put(`/products/admin/quantity/${productID}`, {productQunatity});
    const { data } = prespone;
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
}