import { Button, Result } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
 const navigate = useNavigate();
 return (
  <Result
   status="success"
   title="Successfully Purchases!"
   subTitle="Order number: 2017182818828182881."
   extra={[
    <Button
     onClick={() => navigate("/")}
     type="primary"
     key="console">
     Tiếp tục mua hàng
    </Button>,
    <Link to="/cart/my-cart" key="buy">
     Đến danh sách đơn hàng của bạn
    </Link>,
   ]}
  />
 );
}
