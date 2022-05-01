import { EditOutlined } from "@ant-design/icons";
import {
 Button,
 DatePicker,
 InputNumber,
 Space,
 Table,
 Tag,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { IDiscount } from "constants/models/discount.model";
import moment from "moment";
import AddDiscount from "pages/admin/discount/AddDiscount";
import UpdateDiscount from "pages/admin/discount/UpdateDiscount";
import useDiscount from "pages/admin/discount/useDiscount";
import Voucher from "pages/admin/discount/Voucher";
import React, { useEffect, useState } from "react";
import { formatDate } from "utils/common";

export default function DiscountAdmin() {
 const { getDiscount, discounts, appDiscount } = useDiscount();
 const [openAddDiscount, setOpenAddDiscount] = useState(false);
 const [openUpdateDiscount, setOpenUpdateDiscount] = useState(false);
 const [update, setUpdate] = useState<IDiscount>();
 useEffect(() => {
  getDiscount();
 }, []);

 const columns: ColumnsType<IDiscount> = [
  {
   title: "Tên khuyến mãi",
   dataIndex: "name",
  },
  {
   title: "Ngày bắt đầu",
   dataIndex: "startDate",
   render: (text, record) => {
    return (
     <span style={{ whiteSpace: "nowrap" }}>
      {`${formatDate(record.startDate)} - ${formatDate(
       record.endDate
      )}`}
     </span>
    );
   },
  },
  {
   title: "Tỷ lệ giảm giá",
   dataIndex: "percent",
   render: (percent: number) => {
    return `${percent} %`;
   },
  },
  {
   title: "Danh sách sản phẩm",
   dataIndex: "list",
   render: (text, record) => (
    <>
     {record.list.map((it) => (
      <Tag>{it?.name}</Tag>
     ))}
    </>
   ),
  },
  {
   title: "Trạng thái",
   dataIndex: "status",
   render: (text, record) => {
    return (
     <Space>
      <Tag color={record?.status ? "green" : "red"}>
       {record?.status ? "Đang áp dụng" : "Chưa áp dụng"}
      </Tag>
      <Button
       onClick={() =>
        appDiscount({ _id: record._id, status: !record.status })
       }>
       {!record.status ? "Áp dụng" : "Ngừng áp dụng"}
      </Button>
      <Button
       onClick={() => {
        setUpdate(record);
        setOpenUpdateDiscount(true);
       }}
       icon={<EditOutlined />}
      />
     </Space>
    );
   },
  },
 ];

 return (
  <div>
   <Space className="my-2">
    <Button onClick={() => setOpenAddDiscount(true)}>
     Thêm giảm giá
    </Button>
   </Space>
   <Table
    rowKey={() => Math.random()}
    bordered
    dataSource={discounts}
    columns={columns}
   />
   <AddDiscount
    visible={openAddDiscount}
    hide={() => setOpenAddDiscount(false)}
   />
   <UpdateDiscount
    visible={openUpdateDiscount}
    data={update}
    hide={() => setOpenUpdateDiscount(false)}
   />
   <Voucher />
  </div>
 );
}
