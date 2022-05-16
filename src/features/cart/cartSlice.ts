import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
 ICartItemPreview,
 ICartItem,
} from "constants/models/cart.model";

type State = {
 carts: Array<ICartItem>;
 voucher: string;
 preview: any;
};
const initialState = {
 voucher: "",
} as State;
const cartSlice = createSlice({
 name: "cart",
 initialState,
 reducers: {
  setCart(state, action: PayloadAction<ICartItem[] | []>) {
   state.carts = action.payload;
  },

  setVoucher(state, action: PayloadAction<string>) {
   state.voucher = action.payload;
  },
  setPreview(state, action: PayloadAction<ICartItemPreview[]>) {
   state.preview = action.payload;
  },
  setSuccessPayment(state) {
   state.preview = [];
   state.carts = [];
   state.voucher = "";
  },
  resetCart(state) {
   state.carts = [];
   state.preview = null;
   state.voucher = "";
  },
 },
});

export default cartSlice.reducer;
export const {
 setCart,
 setPreview,
 setVoucher,
 setSuccessPayment,
 resetCart,
} = cartSlice.actions;
