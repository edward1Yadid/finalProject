import axios from "../axios";

const UniqeToken = localStorage.getItem("token");
console.log(UniqeToken);
export const getCartByUser = async (userID) => {
  axios.defaults.headers.common["x-auth-token"] = `${UniqeToken}`;
  try {

    if (!userID) {
      return;
    }
    const prespone = await axios.get(`/cart/${userID}`);
    const { data } = prespone;
    const items = data.items;
    let transformedCarts = items.map((item) => ({
      product: item?.product,
      quantity: item?.quantity,
      _id: item?._id,
    }));
    return transformedCarts;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
export const getCartByUserProduct = async (userID,productID) => {
  try {
    axios.defaults.headers.common["x-auth-token"] = `${UniqeToken}`;
    if (!userID || !productID) {
      return;
    }
    const prespone = await axios.get(`/cart/${userID}/${productID}`);
    const { data } = prespone;
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};


export const createCartByUser = async (userID, product, quantity) => {
  let items = [{ product, quantity }];
  axios.defaults.headers.common["x-auth-token"] = `${UniqeToken}`;
  try {
    const response = await axios.post(`/cart/${userID}/add`, { userID, items });
    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const UpdateQuantityItemByuser = async (
  userID,
  productID,
  newQuantity
) => {
  axios.defaults.headers.common["x-auth-token"] = `${UniqeToken}`;
  try {
    const response = await axios.put(`/cart/${userID}/update`, {
      userID,
      productID,
      newQuantity,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const removeItemFromCartByUser = async (userID, productID) => {
  try {
    axios.defaults.headers.common["x-auth-token"] = `${UniqeToken}`;
    const response = await axios.delete("/cart/remove", {
      data: { userID, productID },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
