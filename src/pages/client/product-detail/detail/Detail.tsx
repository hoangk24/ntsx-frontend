import { Button, Form, InputNumber, Radio } from "antd";
import { ICartItemPreview } from "constants/models/cart.model";
import { IProduct, ISizes } from "constants/models/product.model";
import { useCart } from "hook/useCart";
import { createRule } from "pages/client/cart/Payment";
import useDetail from "pages/client/product-detail/detail/useDetail";
import { useProductDetail } from "pages/client/product-detail/useProductDetail";
import React from "react";
import { formatMoney } from "utils/common";
import "./Detail.scss";

export default function Detail() {
 const { detail } = useProductDetail();
 const {
  maxQuantity,
  onChangeSize,
 } = useDetail(detail?.size);
 const { addCart } = useCart();
 const onFinish = (value: any) =>
  addCart({
   idProduct: detail?._id,
   size: value.size,
   quantity: value.quantity,
  } as ICartItemPreview);

 return (
  <div className="detail">
   <span className="quantity">{maxQuantity}</span>
   <h1>{detail?.name}</h1>
   <div className="created">
    Created By{" "}
    <span className="nsx ml-1 mr-2">{detail?.nsx?.name}</span>
    Design By{" "}
    <span className="category ml-1 mr-2">
     {detail?.category?.name}
    </span>
   </div>
   <div className="price">
    {formatMoney(detail?.price - detail?.discount)}
   </div>
   {detail?.discount > 0 && (
    <div className="discount">
     Giảm {formatMoney(detail?.discount)} (
     {formatMoney(detail?.price)})
    </div>
   )}

   <Form
    onFinish={onFinish}
    initialValues={{
     quantity: 1,
    }}
    className={"detail-description"}
    labelCol={{ span: 3 }}>
    <Form.Item label={"Mã sản phẩm"}>{detail?._id}</Form.Item>
    <Form.Item label={"Mô tả"}>{detail?.note}</Form.Item>
    <Form.Item
     label={"Size"}
     name="size"
     rules={[
      { required: true, message: "Phải chọn size trước khi mua" },
     ]}>
     <Radio.Group className="size" onChange={onChangeSize}>
      {detail?.size?.map((it: ISizes) => (
       <Radio.Button key={it._id} value={it.size}>
        {it?.size}
       </Radio.Button>
      ))}
     </Radio.Group>
    </Form.Item>
    <Form.Item
     label={"Số lượng"}
     rules={[{ ...createRule("Số lượng") }]}
     name="quantity">
     <InputNumber
      defaultValue={1}
      min={1}
      max={maxQuantity}
     />
    </Form.Item>
    <Form.Item>
     <button type="submit" className="btn-grad mx-auto">
      Thêm vào giỏ hàng
     </button>
    </Form.Item>
   </Form>
  </div>
 );
}
