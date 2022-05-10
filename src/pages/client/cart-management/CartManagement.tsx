import React, { useEffect, useMemo } from "react";
import { Result } from "antd";
import { ICart } from "../../../constants/models/cart.model";
import CartList from "./CartList";
import { useCart } from "hook/useCart";

function CartManagement() {
 const { getMycart, myCart } = useCart();

 useEffect(() => {
  getMycart();
 }, []);

 const mapCart = useMemo(() => {
  if (!myCart.length)
   return (
    <Result status={"404"} subTitle={"Bạn chưa có đơn hàng nào"} />
   );
  return myCart.map((it: any) => (
   <CartList key={Math.random()} mycart={it} />
  ));
 }, [myCart]);

 return <div>{mapCart}</div>;
}

export default CartManagement;
