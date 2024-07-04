import axios from "../axios";


//get all categories
export const getAllCategories = async () => {
    try {
      const prespone = await axios.get(`/category`);

  
      const { data } = prespone;
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  };