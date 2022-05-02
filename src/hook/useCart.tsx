import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "app/store";
import { ICartItem } from "constants/models/cart.model";
import {
 getCartUserAction,
 getPreviewAction,
} from "features/cart/cartAction";
import {
 setCart,
 setDisabled,
 setDiscount,
 setFinalCost,
 setPreview,
 setTotalCost,
 setTotalQuantity,
 setTotalQuantity as setTotalQuantityState,
} from "features/cart/cartSlice";
import { useLoading } from "hook/useLoading";
import _cloneDeep from "lodash/cloneDeep";
import _filter from "lodash/filter";
import _findIndex from "lodash/findIndex";
import _reduce from "lodash/reduce";
import { useState } from "react";

export default function useCart() {
 const { carts } = useAppSelector().cart;
 const [myCart, setMyCart] = useState<ICartItem[] | []>([]);
 const { user } = useAppSelector().auth;
 const dispatch = useAppDispatch();
 const loading = useLoading();
 const { voucher } = useAppSelector().cart;

 const addCart = (cart: ICartItem) => {
  const idx = _findIndex(
   carts,
   (n: ICartItem) =>
    n.idProduct === cart.idProduct && n.size === cart.size
  );
  if (idx !== -1) {
   const copy = _cloneDeep(carts);
   copy[idx].quantity += cart.quantity;
   dispatch(setCart(copy));
  } else {
   const copy: ICartItem[] = _cloneDeep(carts);
   copy.push(cart);
   dispatch(setCart(copy));
  }
 };

 const getPreviewCart = () => {
  loading?.show();
  dispatch(getPreviewAction({ carts, voucher }))
   .then(unwrapResult)
   .then((res: any) => {
    dispatch(setPreview(res.data.list));
    dispatch(setTotalCost(res.data.totalCost));
    dispatch(setTotalQuantity(res.data.totalQuantity));
    dispatch(setDiscount(res.data.discount));
    dispatch(setFinalCost(res.data.finalCost));
    dispatch(setDisabled(res.data.isDisabled));
   })
   .finally(() => {
    loading?.hide();
   });
 };

 const calcTotalQuantity = () => {
  const copy: ICartItem[] = _cloneDeep(carts);
  const totalQuantity = _reduce(
   copy,
   (result: any, item) => {
    return result + item.quantity;
   },
   0
  );
  dispatch(setTotalQuantityState(totalQuantity));
 };
 const updateQuantity = (
  idProduct: string,
  size: any,
  quantity: number
 ) => {
  if (!quantity) {
   const copy = _filter(
    _cloneDeep(carts),
    (n: ICartItem) => n.idProduct !== idProduct
   );
   dispatch(setCart(copy));
   return;
  }

  const idx = _findIndex(
   carts,
   (n: ICartItem) => n.idProduct === idProduct && n.size === size
  );
  if (carts[idx].quantity) {
   const copy = _cloneDeep(carts);
   copy[idx].quantity = quantity as any;
   dispatch(setCart(copy));
  } else {
   const copy = _filter(
    _cloneDeep(carts),
    (n: ICartItem) => n.idProduct === idProduct
   );
   dispatch(setCart(copy));
  }
 };
 const removeCart = (idProduct: string, size: any) => {
  let copy = _cloneDeep(carts);
  const idx = _findIndex(copy, (n: ICartItem) => {
   return n.size === size && n.idProduct === idProduct;
  });
  let remove: any = [];
  copy.forEach((it: any, index: number) => {
   if (index !== idx) remove.push(it);
  });
  dispatch(setCart(remove));
 };

 const getMycart = () => {
  loading?.show();
  dispatch(getCartUserAction({ id: user?._id }))
   .then(unwrapResult)
   .then((res: any) => {
    setMyCart(res.data);
   })
   .finally(() => loading?.hide());
 };

 return {
  myCart,
  getMycart,
  addCart,
  calcTotalQuantity,
  getPreviewCart,
  updateQuantity,
  removeCart,
 };
}
