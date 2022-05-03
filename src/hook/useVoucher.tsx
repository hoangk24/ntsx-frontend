import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { useAppDispatch } from "app/store";
import { IVoucher } from "constants/models/voucher.model";
import { checkVoucherAction } from "features/cart/cartAction";
import { setVoucher } from "features/cart/cartSlice";
import {
 createVoucherAction,
 deleteVoucherAction,
 getVoucherAction,
 updateVoucherAction,
} from "features/product/product.action";
import { useLoading } from "hook/useLoading";
import { useState } from "react";

export default function useVoucher() {
 const loading = useLoading();
 const dispatch = useAppDispatch();
 const [voucherList, setVoucherList] = useState([]);
 const addVoucher = (voucher: string) => {
  loading?.show();
  if (!voucher) {
   message.error("Bạn phải nhập voucher");
   loading?.hide();
   return;
  }
  dispatch(checkVoucherAction({ voucher }))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res.message);
    dispatch(setVoucher(voucher));
   })
   .catch((err) => message.error(err.message))
   .finally(() => loading?.hide());
 };

 const getVoucher = () => {
  dispatch(getVoucherAction({}))
   .then(unwrapResult)
   .then((res: any) => {
    setVoucherList(res.data);
   });
 };
 const createVoucher = (data: IVoucher) => {
  loading?.show();
  dispatch(createVoucherAction(data))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res.message);
   })
   .catch((err: any) => message.error(err?.message))
   .finally(() => loading?.hide());
 };
 const updateVoucher = (id: string, data: any) => {
  loading?.show();
  dispatch(updateVoucherAction({ id, data }))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res);
    getVoucher();
   })
   .catch((err: any) => message.error(err?.message))
   .finally(() => loading?.hide());
 };
 const deleteVoucher = (id: string) => {
  loading?.show();
  dispatch(deleteVoucherAction(id))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res);
    getVoucher();
   })
   .catch((err: any) => message.error(err?.message))
   .finally(() => loading?.hide());
 };
 return {
  addVoucher,
  getVoucher,
  voucherList,
  createVoucher,
  updateVoucher,
  deleteVoucher,
 };
}
