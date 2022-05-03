import { createAsyncThunk } from "@reduxjs/toolkit";
import {
 LoginRequestPayload,
 RegisterPayload,
} from "constants/payload/auth.payload";
import { logIn, logOut, register } from "services/auth.service";

export const loginAction = createAsyncThunk(
 "auth/login",
 async (body: LoginRequestPayload, { rejectWithValue }) => {
  try {
   const res = await logIn(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const registerAction = createAsyncThunk(
 "auth/register",
 async (body: RegisterPayload, { rejectWithValue }) => {
  try {
   const res = await register(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const logOutAction = createAsyncThunk(
 "auth/logout",
 async (body, { rejectWithValue }) => {
  try {
   const res = await logOut(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
