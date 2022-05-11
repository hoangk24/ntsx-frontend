import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "constants/models/product.model";
import { IVoucher } from "constants/models/voucher.model";
import {
 addDiscount,
 applyDiscount,
 getDiscount,
 updateDiscount,
} from "services/discount.service";
import {
 addProduct,
 deleteProduct,
 getProduct,
 getProductByCategory,
 getProductByNsx,
 getProductDetail,
 updateProduct,
} from "services/product.service";
import {
 addVoucher,
 deleteVoucher,
 getVoucher,
 updateVoucher,
} from "services/voucher.service";

export const addProductAction = createAsyncThunk(
 "category/add-product",
 async (body: any, { rejectWithValue }) => {
  try {
   const res = await addProduct(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const getProductAction = createAsyncThunk(
 "product/get-product",
 async (body: any, { rejectWithValue }) => {
  try {
   const res = await getProduct();
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const updateProductAction = createAsyncThunk(
 "product/updateProductAction",
 async (
  body: {
   id: string;
   data: Partial<IProduct>;
  },
  { rejectWithValue }
 ) => {
  try {
   const res = await updateProduct(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const getProductDetailAction = createAsyncThunk(
 "product/get-detail-product",
 async (id: string, { rejectWithValue }) => {
  try {
   const res = await getProductDetail(id);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const deleteProductAction = createAsyncThunk(
 "product/delete-product",
 async (body: { id: string }, { rejectWithValue }) => {
  try {
   const res = await deleteProduct(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);

export const getProductCategoryAction = createAsyncThunk(
 "product/get-product-category",
 async (path: string, { rejectWithValue }) => {
  try {
   const res = await getProductByCategory(path);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const getProductNsxAction = createAsyncThunk(
 "product/get-product-nsx",
 async (path: string, { rejectWithValue }) => {
  try {
   const res = await getProductByNsx(path);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const addDiscountAction = createAsyncThunk(
 "discount/addDiscount",
 async (body: any, { rejectWithValue }) => {
  try {
   const res = await addDiscount(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const getDiscountAction = createAsyncThunk(
 "discount/getDiscount",
 async (body: any, { rejectWithValue }) => {
  try {
   const res = await getDiscount();
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const applyDiscountAction = createAsyncThunk(
 "discount/applyDiscount",
 async (body: any, { rejectWithValue }) => {
  try {
   const res = await applyDiscount(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const getVoucherAction = createAsyncThunk(
 "voucher/getVoucher",
 async (body: any, { rejectWithValue }) => {
  try {
   const res = await getVoucher();
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const createVoucherAction = createAsyncThunk(
 "voucher/createVoucher",
 async (body: any, { rejectWithValue }) => {
  try {
   const res = await addVoucher(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const updateVoucherAction = createAsyncThunk(
 "voucher/updateVoucher",
 async (data: { id: string; data: any }, { rejectWithValue }) => {
  try {
   const res = await updateVoucher(data.id, data.data);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const deleteVoucherAction = createAsyncThunk(
 "voucher/deleteVoucher",
 async (id: string, { rejectWithValue }) => {
  try {
   const res = await deleteVoucher({ id });
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
