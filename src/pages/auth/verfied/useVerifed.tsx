import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { useAppDispatch } from "app/store";
import { verifiedAction } from "features/auth/auth.actions";
import { useLoading } from "hook/useLoading";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useVerifed() {
 const [searchParams] = useSearchParams();
 const token = searchParams.get("token");
 const dispatch = useAppDispatch();
 const [error, setError] = useState<boolean>(false);
 const loading = useLoading();
 const verifed = () => {
  loading?.hide();
  dispatch(verifiedAction({ token } as any))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res.message);
   })
   .catch((err: any) => {
    setError(true);
   })
   .finally(() => loading?.hide());
 };
 return { verifed, error };
}
