import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "constants/models/category.model";
import { IDiscount } from "constants/models/discount.model";

interface State {
 discount: IDiscount;
}

const productSlice = createSlice({
 name: "product",
 initialState: {} as State,
 reducers: {
  setDiscount(state, action: PayloadAction<IDiscount>) {
   state.discount = action.payload;
  },
 },
});

export const { setDiscount } = productSlice.actions;

export default productSlice.reducer;
