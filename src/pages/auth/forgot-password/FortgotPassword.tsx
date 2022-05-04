import { Button, Form, Input, Result } from "antd";
import usePassword from "pages/auth/forgot-password/usePassword";
import React from "react";
import "./ForgotPassword.scss";
export default function FortgotPassword() {
 const { forgotPassword, successForgotPassword } = usePassword();
 const onFinish = (values: any) => {
  const { email } = values;
  forgotPassword(email);
 };
 if (successForgotPassword)
  return (
   <Result
    status={"success"}
    title="Thành công"
    subTitle="Hãy check email để xác minh tài khoản"
   />
  );
 return (
  <div className="forgot__password">
   <Form onFinish={onFinish} className="forgot__password-form">
    <h1>Quên mật khẩu</h1>
    <Form.Item
     label="Email"
     name={"email"}
     rules={[
      {
       type: "email",
       message: "Wrong format email",
      },
      {
       required: true,
       message: "Please input your email",
      },
     ]}>
     <Input />
    </Form.Item>
    <Form.Item>
     <Button htmlType="submit" block>
      Gửi
     </Button>
    </Form.Item>
   </Form>
  </div>
 );
}
