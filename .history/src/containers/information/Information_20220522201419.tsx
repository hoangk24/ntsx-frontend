import {
 Avatar,
 Badge,
 Button,
 Form,
 Input,
 Modal,
 Space,
 Typography,
 Upload,
} from "antd";
import { useAppSelector } from "app/store";
import { Role } from "constants/models/auth.model";
import useInfomation from "containers/information/useInfomation";
import useEffectSkipFisrtRender from "hook/useEffectSkipFisrtRender";
import { createRule } from "pages/client/cart/Payment";
import React, { useEffect, useState } from "react";
interface Props {
 visible: boolean;
 onHide: () => void;
}
export default function Information({ onHide, visible }: Props) {
 const { user } = useAppSelector().auth;
 const [showPassword, setShowPassword] = useState(false);
 const { update, updatePassword } = useInfomation();
 const onFinish = (value: any) =>
  updatePassword(value).then(() => setShowPassword(false));

 return (
  <Modal
   title="Thông tin cá nhân"
   visible={visible}
   footer={false}
   onCancel={() => onHide()}>
   <Form onFinish={onFinish} labelCol={{ span: 6 }}>
    <Form.Item wrapperCol={{ span: 24 }}>
     <Space
      direction="vertical"
      style={{
       width: "100%",
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
      }}>
      <Avatar
       style={{
        boxShadow:
         "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
       }}
       src={user?.avatar}
       size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
      />
      <Upload
       maxCount={1}
       showUploadList={false}
       beforeUpload={true as any}
       onChange={({ file }) => update(undefined, file)}>
       <a>Thay đổi</a>
      </Upload>
     </Space>
    </Form.Item>
    <Form.Item label="Họ và tên">
     <Typography.Paragraph
      className="mb-0"
      editable={{
       onChange: (text) => {
        console.log(text);
        update({
         fullName: text,
        });
       },
      }}>
      {user?.fullName}
     </Typography.Paragraph>
    </Form.Item>
    <Form.Item label="Email">
     <Typography>{user?.email?.email}</Typography>
    </Form.Item>
    <Form.Item label="Trạng thái">
     <Badge
      color={user?.email.verified ? "green" : "red"}
      text={user?.email.verified ? "Đã xác minh" : "Chưa xác minh"}
     />
    </Form.Item>
    <Form.Item label="Quyền">
     <Typography className="mb-0">
      {Role[user?.role as Role]}
     </Typography>
    </Form.Item>
    {showPassword && (
     <>
      <Form.Item
       hasFeedback
       name="oldPassword"
       rules={[{ ...createRule("Mật khẩu cũ") }]}
       label="Mật khẩu cũ">
       <Input.Password />
      </Form.Item>
      <Form.Item
       rules={[{ ...createRule("Mật khẩu mới") }]}
       name="newPassword"
       hasFeedback
       label="Mật khẩu mới">
       <Input.Password />
      </Form.Item>
      <Form.Item
       hasFeedback
       rules={[
        { ...createRule("Xác nhận") },
        ({ getFieldValue }) => ({
         validator(_, value) {
          if (!value || getFieldValue("newPassword") === value) {
           return Promise.resolve();
          }
          return Promise.reject(
           new Error("Xác nhận mật khẩu không trùng khớp!")
          );
         },
        }),
       ]}
       name="confirmPassword"
       label="Xác nhận">
       <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5 }}>
       <Space>
        <Button onClick={() => setShowPassword(false)}>Huỷ</Button>
        <Button htmlType="submit">Đổi mật khẩu</Button>
       </Space>
      </Form.Item>
     </>
    )}
    {!showPassword && (
     <Form.Item label="Mật khẩu">
      <Button onClick={() => setShowPassword(true)}>
       Đổi mật khẩu
      </Button>
     </Form.Item>
    )}
   </Form>
  </Modal>
 );
}
