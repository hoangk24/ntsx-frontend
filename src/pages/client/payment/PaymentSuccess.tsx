import { Button, Result } from "antd";
import React from "react";

export default function PaymentSuccess() {
 return (
  <Result
   status="success"
   title="Successfully Purchases!"
   subTitle="Order number: 2017182818828182881."
   extra={[
    <Button type="primary" key="console">
     Đến danh sách đơn hàng của bạn
    </Button>,
    <Button key="buy">Tiếp tục mua hàng</Button>,
   ]}
  />
 );
}
