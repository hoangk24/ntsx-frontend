import { Form, Input, Modal } from "antd";
import { CreateUserRequest } from "constants/payload/user.payload";
import { useUser } from "pages/admin/user/useUser";
import React, { useCallback } from "react";

type Props = {
 show: any;
 hide: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function AddUser(props: Props) {
 const { hide, show } = props;
 const [form] = Form.useForm();
 const { addUser } = useUser();

 const submitForm = useCallback(() => {
  form.validateFields().then((value: CreateUserRequest) => {
   form.resetFields();
   addUser(value);
  });
 }, [form]);

 return (
  <Modal
   title="Thêm người dùng mới"
   visible={show}
   okText="Tạo"
   cancelText="Huỷ"
   onCancel={() => hide(false)}
   onOk={() => submitForm()}>
   <Form
    form={form}
    labelCol={{ span: 5 }}
    wrapperCol={{ span: 17, offset: 2 }}>
    <Form.Item label="Email" name={"email"}>
     <Input placeholder="Nhập email muốn tạo" />
    </Form.Item>
    <Form.Item label="Họ và tên" name={"fullName"}>
     <Input placeholder="Nhập Họ và tên của bạn" />
    </Form.Item>
    <Form.Item label="Mật khẩu" name={"password"}>
     <Input.Password placeholder="Nhập mật khẩu" />
    </Form.Item>
   </Form>
  </Modal>
 );
}
