import { Avatar, Button, Form, Modal, Select, Tag } from "antd";
import { Role } from "constants/models/auth.model";
import useLogicUser from "pages/admin/user/useLogicUser";
import React, { useEffect } from "react";
type Props = {
 show: boolean;
 hide: any;
 idUser: string;
 fetchAll: any;
};
export default function UpdateUser(props: Props) {
 const { hide, show, idUser, fetchAll } = props;
 const { Option } = Select;
 const [form] = Form.useForm();
 const { fetchUser, currentUser, activeMail, changeRole } =
  useLogicUser();

 useEffect(() => {
  fetchUser(idUser);
 }, [idUser]);

 return (
  <Modal
   title="Cật nhật người dùng "
   visible={show}
   onCancel={() => hide(false)}>
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
       activeMail({ id: currentUser?._id as string }, fetchAll);
      }}>
      Xác minh
     </Button>
    </Form.Item>
    <Form.Item label="Quyền" name="role">
     <Select
      defaultValue={currentUser?.role as Role}
      onChange={(value: Role) => {
       changeRole(
        {
         id: currentUser?._id as string,
         role: value,
        },
        fetchAll
       );
      }}>
      <Option value={Role.ADMIN}>Admin</Option>
      <Option value={Role.USER}>User</Option>
     </Select>
    </Form.Item>
   </Form>
  </Modal>
 );
}
