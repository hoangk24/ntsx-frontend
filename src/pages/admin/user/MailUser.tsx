import { Button, Form, Input, Modal, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { CreateEmailPayload } from "constants/payload/auth.payload";
import { CreateEmailValueForm } from "constants/payload/user.payload";
import React, { useCallback, useEffect, useState } from "react";
import useLogicUser from "./useLogicUser";

type Props = {
 show: any;
 hide: React.Dispatch<React.SetStateAction<boolean>>;
 idUser: string;
};
export default function MailUser(props: Props) {
 const { hide, show, idUser } = props;
 const [sendMailLoading, setSendMailLoading] = useState(false);
 const [form] = Form.useForm();
 const { createMail, resendMail, fetchUser, currentUser } =
  useLogicUser();

 useEffect(() => {
  fetchUser(idUser);
 }, []);

 const submitForm = useCallback(() => {
  form.validateFields().then(async (value: CreateEmailValueForm) => {
   const data: CreateEmailPayload = {
    idUser: currentUser?._id as string,
    ...value,
   };
   createMail(data, setSendMailLoading, form.resetFields);
  });
 }, [form, currentUser?._id]);

 return (
  <Modal
   title="Mail"
   visible={show}
   okText="Gửi"
   cancelText="Huỷ"
   confirmLoading={sendMailLoading}
   onCancel={() => hide(false)}
   onOk={() => submitForm()}>
   <Form
    form={form}
    labelCol={{ span: 5 }}
    wrapperCol={{ span: 17, offset: 2 }}>
    <Form.Item label="Xác minh">
     <Button onClick={() => resendMail(currentUser?._id || "")}>
      Gửi lại email xác minh
     </Button>
    </Form.Item>
    <Form.Item label="Email to">
     <Typography>{currentUser?.email?.email}</Typography>
    </Form.Item>
    <Form.Item label="Tên người nhận">
     <Typography>{currentUser?.fullName}</Typography>
    </Form.Item>
    <Form.Item label="Suject" name={"subject"}>
     <Input placeholder="Nhập subject" />
    </Form.Item>
    <Form.Item label="Tiêu đề" name={"title"}>
     <Input placeholder="Nhập tiêu đề" />
    </Form.Item>
    <Form.Item label="Nội dung" name={"message"}>
     <TextArea
      rows={4}
      placeholder="Nhập nội dung email"
      maxLength={6}
     />
    </Form.Item>
   </Form>
  </Modal>
 );
}
