import { Button, Form, Input, Result } from "antd";
import usePassword from "pages/auth/forgot-password/usePassword";
import React from "react";
import "./ChangePassword.scss";
export default function ChangePassword() {
 const { changePassword, successChangePassword } = usePassword();
 const onFinish = (values: any) => {
  changePassword(values);
 };
 if (successChangePassword)
  return (
   <Result
    status={"success"}
    title="Thành công"
    subTitle="Đổi mật khẩu thành công"
   />
  );
 return (
  <div className="change-password">
   <Form
    onFinish={onFinish}
    className="change-password-form"
    labelCol={{ span: 10 }}>
    <h1>Đổi mật khẩu</h1>
    <Form.Item
     hasFeedback
     label="Mật khẩu"
     name={"newPassword"}
     rules={[
      {
       required: true,
       message: "Please confirm your password!",
      },
     ]}>
     <Input.Password />
    </Form.Item>
    <Form.Item
     hasFeedback
     label="Nhập lại mật khẩu"
     name={"confirmNewPassword"}
     rules={[
      {
       required: true,
       message: "Please confirm your password!",
      },
      ({ getFieldValue }) => ({
       validator(_, value) {
        if (!value || getFieldValue("newPassword") === value) {
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
      Đổi mật khẩu
     </Button>
    </Form.Item>
   </Form>
  </div>
 );
}
