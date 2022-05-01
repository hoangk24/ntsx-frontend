import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { RootState, useAppDispatch } from "app/store";
import { LoginRequestPayload } from "constants/payload/auth.payload";
import {
 loginAction,
 logOutAction,
} from "features/auth/auth.actions";
import { setAuth, setLogOut } from "features/auth/auth.slice";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useLogOut() {
 const dispatch = useAppDispatch();
 const navigate = useNavigate();

 const fetchLogOut = () => {
  dispatch(logOutAction())
   .then(unwrapResult)
   .then((res) => logOutSuccess(res))
   .catch((err: any) => message.error(err.message))
   .finally(() => {});
 };
 const logOutSuccess = (res: any) => {
  message.success(res.message);
  dispatch(setLogOut());
  navigate("/login");
 };
 return { fetchLogOut };
}
