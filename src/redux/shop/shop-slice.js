import { createSlice } from "@reduxjs/toolkit";
import operation from "./shop-operations";

const initialState = {
  isLoading: false,
  error: null,
  data: [],
};

export const shopSlice = createSlice({
  name: "shops",
  initialState,
  extraReducers: {
    [operation.fetchShopList.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    [operation.fetchShopList.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    },

    [operation.fetchShopList.rejected]: (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    },
  },
});

export default shopSlice.reducer;
