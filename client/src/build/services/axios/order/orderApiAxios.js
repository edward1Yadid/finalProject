import axios from "../axios";



export const createOrderByUser = async (userID) => {
    try {
      const UniqeToken = localStorage.getItem("token");
      axios.defaults.headers.common["x-auth-token"] = `${UniqeToken}`;
      const prespone = await axios.post (`/order/${userID}`);
      const { data } = prespone;
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  };

  export const getAllOrdersByAdmin = async () => {
    try {
      const UniqeToken = localStorage.getItem("token");
      axios.defaults.headers.common["x-auth-token"] = `${UniqeToken}`;
      const prespone = await axios.get (`/order/manage`);
      const { data } = prespone;
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  };

  export const changeStatusToOrder = async (orderID) => {
    try {
      const UniqeToken = localStorage.getItem("token");
      axios.defaults.headers.common["x-auth-token"] = `${UniqeToken}`;
      const prespone = await axios.patch("/order//manage/status",{orderID})
      const { data } = prespone;
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  };
