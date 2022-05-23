import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { RootState, useAppDispatch, useAppSelector } from "app/store";
import { Role } from "constants/models/auth.model";
import { LoginRequestPayload } from "constants/payload/auth.payload";
import { loginAction } from "features/auth/auth.actions";
import { setAuth } from "features/auth/auth.slice";
import { setCart } from "features/cart/cartSlice";
import { useCart } from "hook/useCart";
import { useLoading } from "hook/useLoading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";
import _findIndex from "lodash/findIndex";

import _reduce from "lodash/reduce";
import { ICartItem } from "constants/models/cart.model";
export default function useLogIn() {
 const dispatch = useAppDispatch();
 const loading = useLoading();
 const { user } = useSelector((state: RootState) => state.auth);
 const navigate = useNavigate();
 const { carts } = useAppSelector().cart;
 const { addCart } = useCart();
 const fetchLogin = (data: LoginRequestPayload) => {
  loading?.show();
  dispatch(loginAction(data))
   .then(unwrapResult)
   .then(async (res: any) => {
    dispatch(setAuth(res?.data));
    let copy = !_isEmpty(carts) ? _cloneDeep(carts) : [];
    const { history } = res?.data?.user;
    for (const his of history) {
     const idx = _findIndex(
      carts,
      (n: ICartItem) =>
       n.idProduct === his.idProduct && n.size === his.size
     );
     if (idx !== -1) {
      copy[idx].quantity += his.quantity;
     } else {
      copy.push({ ...his, size: his.size });
     }
    }
    dispatch(setCart(copy));
    if (user && [Role.MASTER, Role.ADMIN].includes(user.role)) {
     console.log(user.role);
     navigate("/admin");
    } else {
     navigate("/");
    }
    message.success(res?.message);
   })
   .catch((err) => {
    loading?.hide();
    message.error(err.message);
   })
   .finally(() => {
    loading?.hide();
   });
 };

 return { fetchLogin };
}
