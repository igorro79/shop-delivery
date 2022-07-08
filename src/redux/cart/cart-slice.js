import { createSlice } from "@reduxjs/toolkit";
import operation from "./cart-operations";

const initialState = {
  cart: [],
  lastOrder: {},
  ordersHistory: [],
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, { payload }) => {
      if (
        state.cart.some(
          (item) =>
            item.shop === payload.shop && item.item.name === payload.item.name
        )
      ) {
        state.cart.forEach((item) =>
          item.shop === payload.shop && item.item.name === payload.item.name
            ? (item.quantity += 1)
            : null
        );
      } else state.cart = [...state.cart, payload];
    },

    changeQuantity: (state, { payload }) => {
      state.cart.forEach((item) =>
        item.id === payload.itemId && Number(item.quantity) >= 1
          ? (item.quantity = Number(payload.newValue))
          : null
      );
    },

    removeById: (state, { payload }) => {
      state.cart = state.cart.filter(
        (item) => Number(item.id) !== Number(payload)
      );
    },
    erase: (state) => {
      state.cart = [];
    },
  },
  extraReducers: {
    [operation.postOrder.pending]: (state) => {
      state.error = null;
    },

    [operation.postOrder.fulfilled]: (state, { payload }) => {
      state.lastOrder = payload.data;
    },

    [operation.postOrder.rejected]: (state, { error }) => {
      state.error = error.message;
    },

    [operation.fetchOrders.pending]: (state) => {
      state.error = null;
    },

    [operation.fetchOrders.fulfilled]: (state, { payload }) => {
      state.ordersHistory = payload;
    },

    [operation.fetchOrders.rejected]: (state, { error }) => {
      state.error = error.message;
    },
  },
});

export const { add, remove, erase, changeQuantity, removeById } =
  cartSlice.actions;

export default cartSlice.reducer;
