import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategory } from "services/category.service";

export const getCategoryAction = createAsyncThunk(
 "category/get-category",
 async (body: any, { rejectWithValue }) => {
  try {
   const res = await getCategory();
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
