import { createAsyncThunk } from "@reduxjs/toolkit";
import {
 CreateEmailPayload,
 ResendMailPayload,
} from "constants/payload/auth.payload";
import {
 ActiveMailPayload,
 ChangeRolePayload,
 CreateUserRequest,
} from "constants/payload/user.payload";
import { create_mail, re_verifiedMail } from "services/email.service";
import {
 activeMail,
 changeRole,
 createUser,
 deleteUser,
 getAllUser,
 getUserInfo,
} from "services/user.service";

export const getAllUserAction = createAsyncThunk(
 "users/get-all-user",
 async (body, { rejectWithValue }) => {
  try {
   const res = await getAllUser(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const createUserAction = createAsyncThunk(
 "users/create-user",
 async (body: CreateUserRequest, { rejectWithValue }) => {
  try {
   const res = await createUser(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);

export const getUserInfoAction = createAsyncThunk(
 "users/get-user",
 async (id: string, { rejectWithValue }) => {
  try {
   const res = await getUserInfo(id);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);

export const deleteUserAction = createAsyncThunk(
 "users/delete-user",
 async (params: string, { rejectWithValue }) => {
  try {
   const res = await deleteUser(params);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const activeMailAction = createAsyncThunk(
 "users/active-mail",
 async (body: ActiveMailPayload, { rejectWithValue }) => {
  try {
   const res = await activeMail(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const resendMailAction = createAsyncThunk(
 "users/resend-mail",
 async (body: ResendMailPayload, { rejectWithValue }) => {
  try {
   const res = await re_verifiedMail(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const changeRoleAction = createAsyncThunk(
 "users/change-role",
 async (body: ChangeRolePayload, { rejectWithValue }) => {
  try {
   const res = await changeRole(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);

export const createMailAction = createAsyncThunk(
 "users/create-mail",
 async (body: CreateEmailPayload, { rejectWithValue }) => {
  try {
   const res = await create_mail(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
