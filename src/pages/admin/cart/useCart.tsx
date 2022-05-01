import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { useAppDispatch } from "app/store";
import { ICart } from "constants/models/cart.model";
import { ChangeStatusRequest } from "constants/payload/cart.payload";
import {
 changeStatusAction,
 getAllCartAction,
} from "features/cart/cartAction";
import { useLoading } from "hook/useLoading";
import { useState } from "react";

export default function useCart() {
 const dispatch = useAppDispatch();
 const [data, setData] = useState<ICart[] | []>([]);
 const loading = useLoading();
 const getAllCart = () => {
  loading?.show();
  dispatch(getAllCartAction({}))
   .then(unwrapResult)
   .then((res: any) => {
    setData(res.data);
   })
   .finally(() => loading?.hide());
 };
 const changeStatus = (data: ChangeStatusRequest) => {
  loading?.show();
  dispatch(changeStatusAction(data))
   .then(unwrapResult)
   .then((res: any) => {
    getAllCart();
    message.success(res.message);
   })
   .finally(() => loading?.hide());
 };
 return { getAllCart, data, changeStatus };
}
