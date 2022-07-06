import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, item) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.list = [...state.list, item];
    },
    remove: (state, id) => {
      state.list = state.list.filter((item) => item.id !== id);
    },
    incrementQuantityById: (state, id) => {
      state.list = state.list.map((item) =>
        item.id === id ? (item.q += 1) : null
      );
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, remove, increment, decrement, incrementByAmount } =
  cartSlice.actions;

export default cartSlice.reducer;
