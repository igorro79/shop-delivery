import axios from "axios";
axios.defaults.baseURL = "https://g-test-shop-backend.herokuapp.com/api/api";

export const getShopList = async () => {
  try {
    const result = await axios.get(`/shops`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const addShop = async (shop) => {
  try {
    const result = await axios.post("/shops", shop);
    return result;
  } catch (error) {
    console.log(error);
  }
};
