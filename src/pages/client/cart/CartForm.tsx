import { Col, Row, Typography } from "antd";
import DetailPayment from "pages/client/cart/DetailPayment";
import Payment from "pages/client/cart/Payment";
import React from "react";

export default function CartForm() {
 return (
  <div className="cart-form">
   <Typography.Title>Thông tin đặt hàng</Typography.Title>
   <Row>
    <Col lg={12} xs={24}>
     <DetailPayment />
    </Col>
    <Col lg={12} xs={24}>
     <Payment />
    </Col>
   </Row>
  </div>
 );
}
