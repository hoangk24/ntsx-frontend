import { Button, Form, Input, Result, Space } from "antd";
import useRegister from "pages/auth/register/useRegister";
import React from "react";
import { Link } from "react-router-dom";
import "./Register.scss";
export default function Register() {
 const { isSuccess, register } = useRegister();
 const onFinish = (values: any) => {
  register(values);
 };
 if (isSuccess)
  return (
   <div className="register">
    <Result
     status={"success"}
     title="Thành công"
     subTitle="Đăng ký thành công. Hãy check mail để xác nhận tài khoản"
    />
   </div>
  );
 return (
  <div className="register">
   <Form
    onFinish={onFinish}
    className="register__form"
    labelCol={{ span: 7 }}>
    <h1>Đăng ký</h1>
    <Form.Item
     name="email"
     hasFeedback
     label="E-mail"
     rules={[
      {
       type: "email",
       message: "The input is not valid E-mail!",
      },
      {
       required: true,
       message: "Please input your E-mail!",
      },
     ]}>
     <Input />
    </Form.Item>
    <Form.Item
     hasFeedback
     name="fullName"
     label="Họ và tên"
     rules={[
      {
       required: true,
       message: "Please input your full name",
      },
     ]}>
     <Input />
    </Form.Item>
    <Form.Item
     name="password"
     label="Password"
     rules={[
      {
       required: true,
       message: "Please input your password!",
      },
     ]}
     hasFeedback>
     <Input.Password />
    </Form.Item>
    <Form.Item
     label="Nhập lại mật khẩu"
     dependencies={["password"]}
     name="confirm"
     hasFeedback
     rules={[
      {
       required: true,
       message: "Please confirm your password!",
      },
      ({ getFieldValue }) => ({
       validator(_, value) {
        if (!value || getFieldValue("password") === value) {
         return Promise.resolve();
        }
        return Promise.reject(
         new Error("The two passwords that you entered do not match!")
        );
       },
      }),
     ]}>
     <Input.Password />
    </Form.Item>
    <Form.Item>
     <Button htmlType="submit" block>
      Đăng ký
     </Button>
     <Link to="/login">Đăng nhập</Link>
    </Form.Item>
   </Form>
  </div>
 );
}
