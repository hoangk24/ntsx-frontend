import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "app/store";
import { ChangePasswordPayload } from "constants/payload/user.payload";
import {
 changePasswordAction,
 forgotPasswordAction,
} from "features/users/users.action";
import { useLoading } from "hook/useLoading";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function usePassword() {
 const dispatch = useAppDispatch();
 const navigate = useNavigate();
 const loading = useLoading();
 const [searchParams] = useSearchParams();
 const token = searchParams.get("token");
 const [successForgotPassword, setSuccessForgotPassword] =
  useState(false);
 const [successChangePassword, setSuccessChangePassword] =
  useState(false);
 const forgotPassword = (email: string) => {
  loading?.show();
  dispatch(forgotPasswordAction({ email }))
   .then(unwrapResult)
   .then((res: any) => {
    setSuccessForgotPassword(true);
   })
   .finally(() => loading?.hide());
 };
 const changePassword = (data: any) => {
  loading?.show();
  dispatch(changePasswordAction({ ...data, token }))
   .then(unwrapResult)
   .then((res: any) => {
    setSuccessChangePassword(true);
   })
   .finally(() => loading?.hide());
 };
 return {
  forgotPassword,
  changePassword,
  successChangePassword,
  successForgotPassword,
 };
}
