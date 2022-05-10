import { Button, Result, Typography } from "antd";
import { useAppSelector } from "app/store";
import CartForm from "pages/client/cart/CartForm";
import CartList from "pages/client/cart/CartList";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
 const { carts, voucher } = useAppSelector().cart;
 const navigate = useNavigate();

 if (!carts || !carts.length)
  return (
   <Result
    status="404"
    subTitle="Giỏ hàng hiện tại của bạn đang trống"
    extra={
     <Button onClick={() => navigate("/")} type="primary">
      Tiếp tục mua hàng
     </Button>
    }
   />
  );
 return (
  <div>
   <Typography.Title>Giỏ hàng của bạn</Typography.Title>
   <CartList />
   <CartForm />
  </div>
 );
}
