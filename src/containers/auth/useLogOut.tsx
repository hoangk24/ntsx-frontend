import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { RootState, useAppDispatch, useAppSelector } from "app/store";
import {
 LoginRequestPayload,
 LogOutRequestPayload,
} from "constants/payload/auth.payload";
import {
 loginAction,
 logOutAction,
} from "features/auth/auth.actions";
import { setAuth, setLogOut } from "features/auth/auth.slice";
import { resetCart, setCart } from "features/cart/cartSlice";
import { useLoading } from "hook/useLoading";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useLogOut() {
 const dispatch = useAppDispatch();
 const navigate = useNavigate();
 const { carts } = useAppSelector().cart;
 const loading = useLoading();
 const fetchLogOut = () => {
  loading?.show();
  dispatch(logOutAction({ cart: carts }))
   .then(unwrapResult)
   .then((res) => {
    loading?.hide();
    message.success(res.message);
    dispatch(resetCart());
   })
   .catch((err: any) => message.error(err.message))
   .finally(() => {
    loading?.hide();
    dispatch(setLogOut());
    navigate("/login");
   });
 };

 return { fetchLogOut };
}
