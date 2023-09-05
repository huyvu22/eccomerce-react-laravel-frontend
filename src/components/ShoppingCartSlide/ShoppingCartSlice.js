import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useClient from "../../services/Hooks/useClient";

export const postCartData = createAsyncThunk(
  "cart/postCartData",
  async ({ cartData, email = "" }, { rejectWithValue }) => {
    try {
      const client = useClient();
      let res = await client.post(client.cart_data, cartData, { email: email });

      if (res.response.ok) {
        return await res.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCartData = createAsyncThunk(
  "cart/updateCartData",
  async ({ cartData, id }, { rejectWithValue }) => {
    try {
      const client = useClient();
      let res = await client.put(client.cart_data + `/${id}`, cartData);

      if (res.response.ok) {
        return await res.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCartDataByEmail = createAsyncThunk(
  "cart/fetchCartDataByEmail",
  async (email, { rejectWithValue }) => {
    try {
      const client = useClient();
      const res = await client.get(client.cart_data, { email: email });

      if (res.response.ok) {
        return await res.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartDataSlice = createSlice({
  name: "cartData",
  initialState: { data: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      // Xử lý trạng thái khi postCartData hoặc fetchCartDataByEmail đang chờ xử lý
      .addMatcher(
        (action) =>
          action.type === postCartData.pending.type ||
          action.type === updateCartData.pending.type ||
          action.type === fetchCartDataByEmail.pending.type,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      // Xử lý trạng thái khi postCartData hoặc fetchCartDataByEmail đã hoàn thành thành công
      .addMatcher(
        (action) =>
          action.type === postCartData.fulfilled.type ||
          action.type === updateCartData.pending.type ||
          action.type === fetchCartDataByEmail.fulfilled.type,
        (state, action) => {
          state.loading = false;
          state.error = null;
          // Cập nhật dữ liệu giỏ hàng với dữ liệu được trả về từ API
          state.data = action.payload;
        }
      )
      // Xử lý trạng thái khi postCartData hoặc fetchCartDataByEmail bị từ chối (rejected)
      .addMatcher(
        (action) =>
          action.type === postCartData.rejected.type ||
          action.type === updateCartData.pending.type ||
          action.type === fetchCartDataByEmail.rejected.type,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default cartDataSlice.reducer;
