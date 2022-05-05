import { createAsyncThunk } from "@reduxjs/toolkit";
import {
 addCategory,
 addSubcategory,
 getCategory,
 updateCategory,
} from "services/category.service";

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

export const createCategoryAction = createAsyncThunk(
 "category/create-category",
 async (body: any, { rejectWithValue }) => {
  try {
   const res = await addCategory(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const updatgeCategoryAction = createAsyncThunk(
 "category/update-category",
 async (data: any, { rejectWithValue }) => {
  try {
   const res = await updateCategory(data.id, data.update);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const createSubCategoryAction = createAsyncThunk(
 "category/create-sub-category",
 async (body: any, { rejectWithValue }) => {
  try {
   const res = await addSubcategory(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
