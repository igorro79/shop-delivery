import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllOrders, addOrder } from "../../shared/api/cartApi";

const postOrder = createAsyncThunk("cart", async (order) => {
  console.log(order);
  try {
    const res = await addOrder(order);
    return res;
  } catch (error) {
    console.log(error);
  }
});
const fetchOrders = createAsyncThunk("cart", async () => {
  try {
    const res = await getAllOrders();
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
