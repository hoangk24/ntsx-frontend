import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { useAppDispatch } from "app/store";
import { CreateCommentPayload } from "constants/payload/cart.payload";
import { createCommentAction } from "features/cart/cartAction";
import { useLoading } from "hook/useLoading";
import React from "react";

export default function useComment() {
 const dispatch = useAppDispatch();
 const loading = useLoading();

 const createComment = (data: CreateCommentPayload) => {
  loading?.show();
  return dispatch(createCommentAction(data))
   .then(unwrapResult)
   .then((res: any) => message.success(res.message))
   .catch((err: any) => {
    loading?.hide();
    message.error(err.message);
   })
   .finally(() => loading?.hide());
 };
 return { createComment };
}
