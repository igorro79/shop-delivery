import { createAsyncThunk } from "@reduxjs/toolkit";
import { getShopList } from "../../shared/api/shopApi";

const fetchShopList = createAsyncThunk("region", async () => {
  try {
    const res = await getShopList();

    return res;
  } catch (error) {
    console.log(error);
  }
});

const operation = {
  fetchShopList,
};
export default operation;
