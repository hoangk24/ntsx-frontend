import { Avatar, Button, Form, Modal, Select, Tag } from "antd";
import { IUser, Role } from "constants/models/auth.model";
import useEffectSkipFisrtRender from "hook/useEffectSkipFisrtRender";
import { useUser } from "pages/admin/user/useUser";
import React, { useEffect } from "react";
type Props = {
 show: boolean;
 hide: any;
 user: IUser;
};
export default function UpdateUser(props: Props) {
 const { hide, show, user } = props;
 const { Option } = Select;
 const [form] = Form.useForm();
 const { activeMail, changeRole, fetchAllUser } = useUser();

 useEffectSkipFisrtRender(() => {
  return () => {
   fetchAllUser();
  };
 }, [show]);

 return (
  <Modal
   title="Cật nhật người dùng "
   visible={show}
   footer={false}
   onCancel={() => {
    hide(false);
   }}>
   <Form
    form={form}
    labelCol={{ span: 5 }}
    wrapperCol={{ span: 17, offset: 1 }}>
    <Form.Item>
     <Avatar src={user?.avatar} size={"large"} />
    </Form.Item>
    <Form.Item label="Tên người dùng">
     <span>{user?.fullName}</span>
    </Form.Item>
    <Form.Item label="Email">
     <span>{user?.email?.email}</span>
    </Form.Item>
    <Form.Item label="Xác minh">
     {user?.email?.verified ? (
      <Tag color={"green"}>Đã xác minh</Tag>
     ) : (
      <Tag color={"red"}>Chưa xác minh</Tag>
     )}

     <Button
      onClick={() => {
       activeMail({ id: user?._id as string });
      }}>
      Xác minh
     </Button>
    </Form.Item>
    <Form.Item label="Quyền" name="role">
     <Select
      defaultValue={user?.role}
      onChange={(value: Role) => {
       changeRole({
        id: user?._id as string,
        role: value,
       });
      }}>
      <Option value={Role.ADMIN}>Admin</Option>
      <Option value={Role.USER}>User</Option>
     </Select>
    </Form.Item>
   </Form>
  </Modal>
 );
}
