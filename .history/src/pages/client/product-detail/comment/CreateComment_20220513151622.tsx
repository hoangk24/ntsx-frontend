import { Avatar, Button, Comment, Form, Rate } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useAppSelector } from "app/store";
import { ICartItem } from "constants/models/cart.model";
import { IComment } from "constants/models/comment.model";
import { rateName } from "constants/models/product.model";
import { useCart } from "hook/useCart";
import useComment from "pages/client/product-detail/comment/useComment";
import React from "react";
import { Link, useParams } from "react-router-dom";
interface Props {
 cartId: string;
 product: ICartItem[];
}
export default function CreateComment({ product, cartId }: Props) {
 const { user } = useAppSelector().auth;
 const { getMycart } = useCart();
 const [form] = useForm();
 const { createComment } = useComment();
 const onFinish = async (value: any) => {
  for (const prod of product) {
   const comment: IComment = {
    message: value?.message,
    product: prod.idProduct._id,
    user: user?._id,
    rate: value.rate,
   };
   await createComment({
    cartId,
    comment,
   }).then(() => getMycart());
  }
  form.resetFields();
 };

 return (
  <Comment
   author={<span>{user?.fullName}</span>}
   avatar={
    <Avatar
     src={user?.avatar || "https://joeschmoe.io/api/v1/random"}
     alt="Han Solo"
    />
   }
   content={
    <Form form={form} onFinish={onFinish}>
     <Form.Item
      name="rate"
      required
      rules={[
       {
        required: true,
        message: "Phải đánh giá số sao",
       },
      ]}>
      <Rate tooltips={rateName} />
     </Form.Item>

     <Form.Item>
      <Button htmlType="submit">Send</Button>
     </Form.Item>
    </Form>
   }
  />
 );
}
