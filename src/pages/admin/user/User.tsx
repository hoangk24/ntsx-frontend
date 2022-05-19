import {
 Avatar,
 Badge,
 Button,
 Popconfirm,
 Space,
 Table,
 Tabs,
 Tag,
} from "antd";
import useDefineSearch from "hook/useDefineSearch";
import React, { useEffect, useState } from "react";
import { IUser, Role } from "constants/models/auth.model";
import { ColumnsType } from "antd/es/table";
import AddUser from "pages/admin/user/AddUser";
import MailUser from "pages/admin/user/MailUser";
import UpdateUser from "pages/admin/user/UpdateUser";
import { useUser } from "pages/admin/user/useUser";
import {
 DeleteOutlined,
 EditOutlined,
 LockOutlined,
 MailOutlined,
 ReloadOutlined,
 UnlockOutlined,
 UserOutlined,
} from "@ant-design/icons";
import _filter from "lodash/filter";
export default function User() {
 const [openAddModal, setOpenAddModal] = useState(false);
 const { fetchAllUser, deleteAcccount } = useUser();
 const [openUpdateModal, setOpenUpdateModal] = useState<{
  user: IUser | any;
  show: boolean;
 }>({
  user: {} as IUser,
  show: false,
 });
 const [openSendMailModal, setOpenSendMailModal] = useState<{
  user: IUser | any;
  show: boolean;
 }>({
  user: {} as IUser,
  show: false,
 });
 const { getColumnSearchProps } = useDefineSearch();
 const { data, deleteUser } = useUser();

 const columns: ColumnsType<IUser> = [
  {
   title: "Avatar",
   dataIndex: "avatar",
   key: "avatar",
   render: (avatar: string) => <Avatar src={avatar} />,
  },
  {
   title: "Họ và tên",
   dataIndex: "fullName",
   key: "fullName",
   ...getColumnSearchProps("fullName"),
  },
  {
   title: "Email",
   dataIndex: "email.email",
   key: "email.email",
   render: (text, record) => {
    return <>{record?.email?.email}</>;
   },
  },
  {
   title: "Xác minh",
   dataIndex: "email.verified",
   render: (text, record) =>
    record?.email?.verified ? (
     <Tag color={"green"}>Đã xác minh</Tag>
    ) : (
     <Tag color={"red"}>Chưa xác minh</Tag>
    ),
  },
  {
   title: "Trạng thái",
   dataIndex: "isDeleted",
   render: (text, record) => (
    <>
     {record?.__v === 1 ? (
      <Badge color={"red"} text={"Đã xoá"} />
     ) : (
      <Badge
       color={!record.isDeleted ? "green" : "red"}
       text={!record.isDeleted ? "Đang hoạt động" : "Đang khoá"}
      />
     )}
    </>
   ),
  },
  {
   title: "Quyền",
   dataIndex: "role",
   key: "role",
   render: (text, record) =>
    record?.role === Role.USER ? (
     <Tag color={"green"}>USER</Tag>
    ) : (
     <Tag color={"red"}>ADMIN</Tag>
    ),
  },
  {
   title: "Thao tác",
   key: "action",
   render: (text, record) => {
    return (
     <>
      <Popconfirm
       title={
        !record.isDeleted
         ? "Khoá tài khoản này"
         : "Mở khoá tài khoản này"
       }
       okText={!record.isDeleted ? "Khoá" : "Mở khoá"}
       cancelText="Huỷ"
       onConfirm={() => deleteUser(record?._id)}>
       <Button
        icon={
         !record.isDeleted ? <LockOutlined /> : <UnlockOutlined />
        }
       />
      </Popconfirm>
      <Button
       disabled={record.role === Role.MASTER}
       onClick={() => {
        setOpenSendMailModal({
         user: record,
         show: true,
        });
       }}
       icon={<MailOutlined />}
      />
      <Button
       disabled={record.role === Role.MASTER}
       onClick={() => {
        setOpenUpdateModal({
         user: record,
         show: true,
        });
       }}
       icon={<EditOutlined />}
      />
      <Popconfirm
       title={
        !record?.__v ? "Xoá tài khoản này" : "Hoàn tác tài khoản này"
       }
       okText={!record?.__v ? "Xoá" : "Hoàn tác"}
       cancelText="Huỷ"
       onConfirm={() =>
        deleteAcccount({
         id: record._id,
         isDeleted: record?.__v === 0,
        })
       }>
       <Button
        icon={!record?.__v ? <DeleteOutlined /> : <ReloadOutlined />}
       />
      </Popconfirm>
     </>
    );
   },
  },
 ];

 return (
  <div className="product">
   <Space className={"my-2"}>
    <Button
     onClick={() => setOpenAddModal(true)}
     icon={<UserOutlined />}>
     Thêm người dùng mới
    </Button>
    <Button onClick={() => fetchAllUser()} icon={<ReloadOutlined />}>
     Làm mới
    </Button>
   </Space>

   <Tabs defaultActiveKey={"1"}>
    <Tabs.TabPane tab="Member" key={"1"}>
     <Table
      bordered
      size={"small"}
      dataSource={_filter(data, (n: IUser) => n?.__v === 0)}
      columns={columns}
      rowKey={(record) => record._id}
     />
    </Tabs.TabPane>
    <Tabs.TabPane tab="Đã xoá" key={"2"}>
     <Table
      bordered
      size={"small"}
      dataSource={_filter(data, (n: IUser) => n?.__v === 1)}
      columns={columns}
      rowKey={(record) => record._id}
     />
    </Tabs.TabPane>
   </Tabs>

   <MailUser
    user={openSendMailModal.user}
    show={openSendMailModal.show}
    hide={() =>
     setOpenSendMailModal({ ...openSendMailModal, show: false })
    }
   />
   <UpdateUser
    user={openUpdateModal.user}
    show={openUpdateModal.show}
    hide={setOpenUpdateModal}
   />
   <AddUser hide={() => setOpenAddModal(false)} show={openAddModal} />
  </div>
 );
}
