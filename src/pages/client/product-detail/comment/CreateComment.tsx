import { Avatar, Button, Comment, Form, Rate } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useAppSelector } from "app/store";
import { IComment } from "constants/models/comment.model";
import { rateName } from "constants/models/product.model";
import useComment from "pages/client/product-detail/comment/useComment";
import React from "react";
import { Link, useParams } from "react-router-dom";

export default function CreateComment() {
 const { createComment } = useComment();
 const { id } = useParams();
 const { user, isLogin } = useAppSelector().auth;
 const [form] = useForm();
 const onFinish = (value: any) => {
  const comment: IComment = {
   message: value?.message,
   product: id,
   user: user?._id,
   rate: value.rate,
  };
  createComment(comment);
  form.resetFields();
 };

 if (!isLogin)
  return (
   <div>
    Hãy <Link to="/login">Đăng nhập</Link> để đánh giá sản phẩm này
   </div>
  );
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
