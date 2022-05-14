import { Button, Col, Input, Row, Tag } from "antd";
import { useAppDispatch, useAppSelector } from "app/store";
import { setVoucher } from "features/cart/cartSlice";
import { useVoucher } from "hook/useVoucher";
import React, { useMemo, useState } from "react";
import { formatMoney } from "utils/common";
import "./DetailPayment.scss";
export default function DetailPayment() {
 const [voucherString, setVoucherString] = useState("");
 const { voucher, preview } = useAppSelector().cart;

 const { addVoucher } = useVoucher();
 const dispatch = useAppDispatch();
 const mapVoucer = useMemo(() => {
  return (
   <Tag
    closable
    onClose={() => dispatch(setVoucher(""))}
    color={"green"}>
    {voucher}
   </Tag>
  );
 }, [voucher]);

 return (
  <table className="detail-payment-table">
   <tr>
    <th>Tổng số lượng:</th>
    <td>{preview?.totalQuantity || 0}</td>
   </tr>
   <tr>
    <th>Ước tính:</th>
    <td>{formatMoney(preview?.totalCost || 0)}</td>
   </tr>
   <tr>
    <th>Voucher:</th>
    <td>
     {voucher ? (
      mapVoucer
     ) : (
      <Row className="">
       <Col>
        <Input
         onChange={(e: any) => setVoucherString(e.target.value)}
        />
       </Col>
       <Col>
        <Button
         onClick={() => addVoucher(voucherString.toUpperCase())}
         block>
         Áp dụng
        </Button>
       </Col>
      </Row>
     )}
    </td>
   </tr>
   <tr>
    <th>Giảm giá:</th>
    <td>{formatMoney(preview?.discount || 0)}</td>
   </tr>
   <tr>
    <th>Tổng thanh toán</th>
    <td> {formatMoney(preview?.finalCost || 0)}</td>
   </tr>
  </table>
 );
}
