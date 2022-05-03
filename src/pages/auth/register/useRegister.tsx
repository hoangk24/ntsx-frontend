import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { useAppDispatch } from "app/store";
import { RegisterPayload } from "constants/payload/auth.payload";
import { registerAction } from "features/auth/auth.actions";
import { useLoading } from "hook/useLoading";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useRegister() {
 const [isSuccess, setIsSuccess] = useState(false);
 const dispatch = useAppDispatch();
 const loading = useLoading();
 const register = (data: RegisterPayload) => {
  loading?.show();
  dispatch(registerAction(data))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res.message);
    setIsSuccess(true);
   })
   .finally(() => loading?.hide());
 };
 return { isSuccess, register };
}
