import { Col, Row, Typography } from "antd";
import DetailPayment from "pages/client/cart/DetailPayment";
import Payment from "pages/client/cart/Payment";
import React from "react";

export default function CartForm() {
 return (
  <div className="">
   <Typography.Title>Thông tin đặt hàng</Typography.Title>
   <Row className="p-5">
    <Col span={12}>
     <DetailPayment />
    </Col>
    <Col span={12}>
     <Payment />
    </Col>
   </Row>
  </div>
 );
}
