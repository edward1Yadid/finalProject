import axios from "../axios";


export const getAllModels = async () => {
    try {
      const prespone = await axios.get(`/models`);
  
      const { data } = prespone;
      console.log(data);
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  };