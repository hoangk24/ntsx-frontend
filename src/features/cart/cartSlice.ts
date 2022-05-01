import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItemPreview } from "constants/models/cart.model";

interface State {
 carts: ICartItemPreview[] | [];
 totalQuantity: number;
 voucher: string;
 discount: number;
 totalCost: number;
 finalCost: number;
 isDisabled: boolean;
}

const cartSlice = createSlice({
 name: "cart",
 initialState: {
  carts: [],
  totalQuantity: 0,
  voucher: "",
  discount: 0,
  totalCost: 0,
  finalCost: 0,
  isDisabled: false,
 } as State,
 reducers: {
  setCart(state, action: PayloadAction<ICartItemPreview[]>) {
   state.carts = action.payload;
  },
  setTotalQuantity(state, action: PayloadAction<number>) {
   state.totalQuantity = action.payload;
  },
  setVoucher(state, action: PayloadAction<string>) {
   state.voucher = action.payload;
  },
  setDiscount(state, action: PayloadAction<number>) {
   state.discount = action.payload;
  },
  setTotalCost(state, action: PayloadAction<number>) {
   state.totalCost = action.payload;
  },
  setFinalCost(state, action: PayloadAction<number>) {
   state.finalCost = action.payload;
  },
  setDisabled(state, action: PayloadAction<boolean>) {
   state.isDisabled = action.payload;
  },
  setSuccessPayment(state) {
   state.finalCost = 0;
   state.discount = 0;
   state.totalCost = 0;
   state.totalQuantity = 0;
   state.carts = [];
   state.isDisabled = false;
   state.voucher = "";
  },
 },
});

export default cartSlice.reducer;
export const {
 setCart,
 setTotalQuantity,
 setVoucher,
 setDiscount,
 setTotalCost,
 setFinalCost,
 setSuccessPayment,
 setDisabled,
} = cartSlice.actions;
