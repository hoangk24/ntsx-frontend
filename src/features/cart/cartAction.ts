import { createAsyncThunk } from "@reduxjs/toolkit";
import {
 ChangeStatusRequest,
 CreateCartRequest,
 CreateCommentPayload,
} from "constants/payload/cart.payload";
import {
 changeStatus,
 checkVoucher,
 createCart,
 createComment,
 getAllCart,
 getCartUser,
 getPreview,
} from "services/cart.service";

export const getPreviewAction = createAsyncThunk(
 "cart/get-preview",
 async (body: any, { rejectWithValue }) => {
  try {
   const res = await getPreview(body);
   return res.data;
  } catch (error: any) {
   rejectWithValue(error.data);
  }
 }
);

export const getCartUserAction = createAsyncThunk(
 "cart/get-user",
 async (params: any, { rejectWithValue }) => {
  try {
   const res = await getCartUser(params);
   return res.data;
  } catch (error: any) {
   rejectWithValue(error.data);
  }
 }
);
export const getAllCartAction = createAsyncThunk(
 "cart/get-all-cart",
 async (body: any, { rejectWithValue }) => {
  try {
   const res = await getAllCart();
   return res.data;
  } catch (error: any) {
   rejectWithValue(error.data);
  }
 }
);

export const checkVoucherAction = createAsyncThunk(
 "cart/check-voucher",
 async (params: { voucher: string }, { rejectWithValue }) => {
  try {
   const res = await checkVoucher(params);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const createCartAction = createAsyncThunk(
 "cart/create-cart",
 async (body: CreateCartRequest, { rejectWithValue }) => {
  try {
   const res = await createCart(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const changeStatusAction = createAsyncThunk(
 "cart/change-status",
 async (body: ChangeStatusRequest, { rejectWithValue }) => {
  try {
   const res = await changeStatus(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const createCommentAction = createAsyncThunk(
 "cart/createCommentAction",
 async (body: CreateCommentPayload, { rejectWithValue }) => {
  try {
   const res = await createComment(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
