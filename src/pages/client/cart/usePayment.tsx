import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "app/store";
import { CartStatus } from "constants/models/cart.model";
import { CreateCartRequest } from "constants/payload/cart.payload";
import { createCartAction } from "features/cart/cartAction";
import { setSuccessPayment } from "features/cart/cartSlice";
import { useLoading } from "hook/useLoading";
import React from "react";
import { useNavigate } from "react-router-dom";

export enum TypeCreateCart {
 PayPal = 1,
 BeforeRecieved = 2,
}

export default function usePayment() {
 const navigate = useNavigate();
 const { user } = useAppSelector().auth;
 const {
  carts,
  preview,
  discount,
  finalCost,
  totalCost,
  totalQuantity,
 } = useAppSelector().cart;

 const loading = useLoading();
 const dispatch = useAppDispatch();
 const onPaymentSuccess = (type: TypeCreateCart, data: any) => {
  let address = "";
  let phoneNumber = "";
  let fullName = "";
  switch (type) {
   case TypeCreateCart.BeforeRecieved:
    address = data.address;
    phoneNumber = data?.phoneNumber;
    fullName = data?.fullName;
    break;
   case TypeCreateCart.PayPal:
    address = "bồng sơn hoài nhơn bình định";
    phoneNumber = "0344184570";
    fullName = data?.name?.surname + data?.name?.given_name;
    break;
  }

  const create: CreateCartRequest = {
   user: user?._id || "",
   list: preview,
   totalCost,
   totalQuantity,
   discount,
   finalCost,
   fullName,
   isPaided: type === TypeCreateCart.PayPal ? true : false,
   address,
   phoneNumber,
   status: CartStatus.CREATING,
  };
  loading?.show();
  dispatch(createCartAction(create))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res.message);
    navigate("/payment-success");
    dispatch(setSuccessPayment());
   })
   .catch((err: any) => {
    message.error(err.message);
   })
   .finally(() => loading?.hide());
 };
 return { onPaymentSuccess };
}
