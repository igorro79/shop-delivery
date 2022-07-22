import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllOrders, addOrder } from "../../shared/api/cartApi";

const postOrder = createAsyncThunk("cart-order", async (order) => {
  try {
    const res = await addOrder(order);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
const fetchOrders = createAsyncThunk("cart-history", async () => {
  try {
    const res = await getAllOrders();
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

const operation = {
  postOrder,
  fetchOrders,
};
export default operation;
