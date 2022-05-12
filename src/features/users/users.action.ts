import { createAsyncThunk } from "@reduxjs/toolkit";
import {
 CreateEmailPayload,
 ResendMailPayload,
} from "constants/payload/auth.payload";
import {
 ActiveMailPayload,
 ChangePasswordPayload,
 ChangeRolePayload,
 CreateUserRequest,
 ForgotPasswordPayload,
 UpdateInformationPayload,
 UpdatePasswordPayload,
} from "constants/payload/user.payload";
import {
 create_mail,
 forgotPassword,
 re_verifiedMail,
} from "services/email.service";
import {
 activeMail,
 changePassword,
 changeRole,
 createUser,
 deleteUser,
 getAllUser,
 getUserInfo,
 updateInformation,
 updatePassword,
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

export const updateInformationAction = createAsyncThunk(
 "users/updateInformationAction",
 async (body: UpdateInformationPayload, { rejectWithValue }) => {
  try {
   const res = await updateInformation(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const changePasswordAction = createAsyncThunk(
 "users/changePasswordAction",
 async (body: ChangePasswordPayload, { rejectWithValue }) => {
  try {
   const res = await changePassword(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const updatePasswordAction = createAsyncThunk(
 "users/updatePasswordAction",
 async (body: UpdatePasswordPayload, { rejectWithValue }) => {
  try {
   const res = await updatePassword(body);
   return res.data;
  } catch (error: any) {
   return rejectWithValue(error?.response.data);
  }
 }
);
export const forgotPasswordAction = createAsyncThunk(
 "users/forgotPasswordAction",
 async (body: ForgotPasswordPayload, { rejectWithValue }) => {
  try {
   const res = await forgotPassword(body);
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
