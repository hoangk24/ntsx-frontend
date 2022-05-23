import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "app/store";
import { logOutAction } from "features/auth/auth.actions";
import { setLogOut } from "features/auth/auth.slice";
import { resetCart } from "features/cart/cartSlice";
import { useLoading } from "hook/useLoading";
import { useNavigate } from "react-router-dom";

export default function useLogOut() {
 const dispatch = useAppDispatch();
 const navigate = useNavigate();
 const { carts } = useAppSelector().cart;
 const loading = useLoading();
 const fetchLogOut = () => {
  if (!carts.length) {
   dispatch(setLogOut());
  } else {
   loading?.show();
   dispatch(logOutAction({ cart: carts }))
    .then(unwrapResult)
    .then((res: any) => {
     loading?.hide();
     message.success(res.message);
     dispatch(resetCart());
     navigate("/login");
    })
    .finally(() => {
     loading?.hide();
     dispatch(setLogOut());
     navigate("/login");
    });
  }
 };

 return { fetchLogOut };
}
