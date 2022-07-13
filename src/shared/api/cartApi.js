import axios from "axios";
axios.defaults.baseURL = "https://g-test-shop-backend.herokuapp.com/api";

export const getAllOrders = async () => {
  try {
    const result = await axios.get("/carts");
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const addOrder = async (order) => {
  try {
    console.log(order);
    const result = await axios.post("/carts", order);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
