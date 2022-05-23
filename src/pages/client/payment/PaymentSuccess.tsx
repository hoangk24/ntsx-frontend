import { Button, Result } from "antd";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function PaymentSuccess() {
 const navigate = useNavigate();
 const { id } = useParams();
 return (
  <Result
   status="success"
   title="Đặt hàng thành công!"
   subTitle={`Mã đơn hàng: ${id} `}
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
