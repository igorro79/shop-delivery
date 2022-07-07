import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders, sendOrder } from "../../shared/api/shopApi";

const postOrder = createAsyncThunk("cart", async ({ order }) => {
  try {
    const res = await sendOrder(order);
    return res;
  } catch (error) {
    throw Error(error);
  }
});
const fetchOrders = createAsyncThunk("cart", async () => {
  try {
    const res = await getOrders();
    return res;
  } catch (error) {
    console.log(error);
  }
});

const operation = {
  postOrder,
  fetchOrders,
};
export default operation;
