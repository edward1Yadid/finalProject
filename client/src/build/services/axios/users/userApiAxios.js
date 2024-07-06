import axios from "../axios";



export const loginApi = async (user) => {
  try {
    const response = await axios.post(`users/login`, user);
    return response.data

  } catch (error) {
    if (error) return Promise.reject(error.message);
  }
};
export const registerUser = async (user) => {
  try {
    const response = await axios.post(`users`, user);

    return response.data;
    
  } catch (error) {
    return Promise.reject(error.message);
  }
};
