import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginRequestPayload } from "constants/payload/auth.payload";
import { logIn, logOut } from "services/auth.service";

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
