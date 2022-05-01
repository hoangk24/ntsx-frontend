import { Form, InputNumber, Radio } from "antd";
import { IProduct, ISizes } from "constants/models/product.model";
import useCart from "hook/useCart";
import useDetail from "pages/client/product-detail/detail/useDetail";
import React from "react";
import { formatMoney } from "utils/common";
import "./Detail.scss";
import { ICartItemPreview } from "../../../../constants/models/cart.model";

type Props = {
 data: IProduct;
};
export default function Detail({ data }: Props) {
 const {
  _id,
  category,
  discount,
  name,
  nsx,
  posters,
  price,
  size,
  note,
 } = data;
 const {
  maxQuantity,
  onChangeSize,
  quantityChoice,
  sizeChoice,
  onChangeQuantity,
 } = useDetail(size);
 const { addCart } = useCart();

 return (
  <div className="detail">
   <span className="quantity">{maxQuantity}</span>
   <h1>{name}</h1>
   <div className="created">
    Created By <span className="nsx ml-1 mr-2">{nsx.name}</span>
    Design By{" "}
    <span className="category ml-1 mr-2">{category.name}</span>
   </div>
   <div className="price">{formatMoney(price - discount)}</div>
   {discount && (
    <div className="discount">
     Giảm {formatMoney(discount)} ({formatMoney(price)})
    </div>
   )}

   <Form className={"detail-description"} labelCol={{ span: 3 }}>
    <Form.Item label={"Mã sản phẩm"}>{_id}</Form.Item>
    <Form.Item label={"Mô tả"}>{note}</Form.Item>
    <Form.Item label={"Size"}>
     <Radio.Group
      defaultValue={size[0].size}
      className="size"
      onChange={onChangeSize}>
      {size.map((it: ISizes) => (
       <Radio.Button key={Math.random()} value={it.size}>
        {it.size}
       </Radio.Button>
      ))}
     </Radio.Group>
    </Form.Item>
    <Form.Item label={"Số lượng"}>
     <InputNumber
      value={quantityChoice}
      onChange={onChangeQuantity}
      defaultValue={1}
      min={1}
      max={maxQuantity}
      style={{ margin: "0 16px" }}
     />
    </Form.Item>
    <button
     onClick={() =>
      addCart({
       idProduct: _id,
       size: sizeChoice as any,
       quantity: quantityChoice as any,
      } as ICartItemPreview)
     }
     className="btn-grad mx-auto">
     Thêm vào giỏ hàng
    </button>
   </Form>
  </div>
 );
}
