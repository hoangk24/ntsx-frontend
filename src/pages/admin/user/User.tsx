import { Avatar, Button, Popconfirm, Space, Table, Tag } from "antd";
import useDefineSearch from "hook/useDefineSearch";
import useLogicUser from "pages/admin/user/useLogicUser";
import React, { useEffect, useState } from "react";
import { IUser, Role } from "constants/models/auth.model";
import { ColumnsType } from "antd/es/table";
import AddUser from "pages/admin/user/AddUser";
import MailUser from "pages/admin/user/MailUser";
import UpdateUser from "pages/admin/user/UpdatUser";

export default function User() {
 const [openAddModal, setOpenAddModal] = useState(false);
 const [openUpdateModal, setOpenUpdateModal] = useState(false);
 const [openSendMailModal, setOpenSendMailModal] = useState(false);
 const { getColumnSearchProps } = useDefineSearch();
 const [id, setId] = useState<string>("");
 const { data, fetchAllUser, deleteUser } = useLogicUser();

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
       title="Are you sure?"
       okText="Yes"
       cancelText="No"
       onConfirm={() => deleteUser(record?._id)}>
       <Button>Xoá</Button>
      </Popconfirm>
      <Button
       onClick={() => {
        setId(record._id);
        setOpenSendMailModal(true);
       }}>
       Mail
      </Button>
      <Button
       onClick={() => {
        setId(record._id);
        setOpenUpdateModal(true);
       }}>
       Sửa
      </Button>
     </>
    );
   },
  },
 ];

 useEffect(() => {
  fetchAllUser();
 }, []);

 return (
  <div className="product">
   <Space className={"my-2"}>
    <Button onClick={() => setOpenAddModal(true)}>
     Thêm người dùng mới
    </Button>
   </Space>

   <Table
    size={"small"}
    dataSource={data}
    columns={columns}
    rowKey={(record) => Math.random()}
   />
   {id && (
    <MailUser
     idUser={id}
     show={openSendMailModal}
     hide={setOpenSendMailModal}
    />
   )}
   {id && (
    <UpdateUser
     fetchAll={fetchAllUser}
     idUser={id}
     show={openUpdateModal}
     hide={setOpenUpdateModal}
    />
   )}
   <AddUser hide={() => setOpenAddModal(false)} show={openAddModal} />
  </div>
 );
}
