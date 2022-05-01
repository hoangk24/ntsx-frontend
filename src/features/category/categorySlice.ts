import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "constants/models/category.model";

interface State {
 categories: ICategory[] | [];
}

const categorySlice = createSlice({
 name: "category",
 initialState: {} as State,
 reducers: {
  setCategory(state, action: PayloadAction<ICategory[]>) {
   state.categories = action.payload;
  },
 },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
