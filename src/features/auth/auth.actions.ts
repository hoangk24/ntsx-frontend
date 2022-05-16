import { createAsyncThunk } from "@reduxjs/toolkit";
import {
 LoginRequestPayload,
 LogOutRequestPayload,
 RegisterPayload,
} from "constants/payload/auth.payload";
import { logIn, logOut, register } from "services/auth.service";
import { verified } from "services/email.service";

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
 async (body: LogOutRequestPayload, { rejectWithValue }) => {
  try {
   const res = await logOut(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const verifiedAction = createAsyncThunk(
 "auth/verified",
 async (body: { token: string }, { rejectWithValue }) => {
  try {
   const res = await verified(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
