import { Avatar, Button, Form, Modal, Select, Tag } from "antd";
import { Role } from "constants/models/auth.model";
import { useUser } from "pages/admin/user/useUser";
import React, { useEffect } from "react";
type Props = {
 show: boolean;
 hide: any;
 idUser: string;
};
export default function UpdateUser(props: Props) {
 const { hide, show, idUser } = props;
 const { Option } = Select;
 const [form] = Form.useForm();
 const {
  fetchUser,
  currentUser,
  activeMail,
  changeRole,
  fetchAllUser,
 } = useUser();

 useEffect(() => {
  fetchUser(idUser);
 }, [idUser]);

 return (
  <Modal
   title="Cật nhật người dùng "
   visible={show}
   onCancel={() => {
    hide(false);
    fetchAllUser();
   }}>
   <Form
    form={form}
    labelCol={{ span: 5 }}
    wrapperCol={{ span: 17, offset: 1 }}>
    <Form.Item>
     <Avatar src="" size={"large"} />
    </Form.Item>
    <Form.Item label="Tên người dùng">
     <span>{currentUser?.fullName}</span>
    </Form.Item>
    <Form.Item label="Email">
     <span>{currentUser?.email.email}</span>
    </Form.Item>
    <Form.Item label="Xác minh">
     {currentUser?.email.verified ? (
      <Tag color={"green"}>Đã xác minh</Tag>
     ) : (
      <Tag color={"red"}>Chưa xác minh</Tag>
     )}

     <Button
      onClick={() => {
       activeMail({ id: currentUser?._id as string });
      }}>
      Xác minh
     </Button>
    </Form.Item>
    <Form.Item label="Quyền" name="role">
     <Select
      defaultValue={currentUser?.role as Role}
      onChange={(value: Role) => {
       changeRole({
        id: currentUser?._id as string,
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
