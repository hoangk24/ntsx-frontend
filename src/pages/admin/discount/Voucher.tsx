import {
 CloseOutlined,
 DeleteOutlined,
 HighlightOutlined,
} from "@ant-design/icons";
import {
 Badge,
 Button,
 DatePicker,
 InputNumber,
 Popconfirm,
 Space,
 Table,
 Typography,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { IVoucher } from "constants/models/voucher.model";
import { useVoucher } from "hook/useVoucher";
import moment from "moment";
import AddVoucher from "pages/admin/discount/AddVoucher";
import React, { useEffect, useState } from "react";

export default function Voucher() {
 const { getVoucher, voucherList, updateVoucher, deleteVoucher } =
  useVoucher();
 const [openAddVoucher, setOpenAddVoucher] = useState(false);
 const { RangePicker } = DatePicker;
 const { Paragraph } = Typography;
 const isExpired = (endDate: any) =>
  moment(Date.now()).isBefore(endDate);
 const columns: ColumnsType<IVoucher> = [
  {
   title: "Mã voucher",
   dataIndex: "voucher",
   render: (text, record) => (
    <Paragraph
     editable={{
      icon: <HighlightOutlined />,
      tooltip: "click to edit text",
      onChange: (e) =>
       updateVoucher(record._id as string, { voucher: e }),
     }}>
     {text}
    </Paragraph>
   ),
  },
  {
   title: "Thời gian",
   dataIndex: "startDate",
   render: (text, record) => (
    <RangePicker
     onChange={(e) =>
      updateVoucher(record._id as string, {
       startDate: moment(e?.[0]),
       endDate: moment(e?.[1]),
      })
     }
     defaultValue={[moment(record.startDate), moment(record.endDate)]}
    />
   ),
  },
  {
   title: "Trạng thái",
   dataIndex: "status",
   render: (text, record) => (
    <Badge
     color={isExpired(record.endDate) ? "green" : "red"}
     text={isExpired(record.endDate) ? "Hoạt động" : "Hết hạn"}
    />
   ),
  },
  {
   title: "Tỷ lệ giảm",
   dataIndex: "percent",
   render: (text, record) => (
    <InputNumber
     min={1}
     max={100}
     defaultValue={record.percent}
     addonAfter="%"
     onChange={(e) => {
      updateVoucher(record._id as string, { percent: e });
     }}
    />
   ),
  },
  {
   title: "Thao tác",
   render: (text, record) => (
    <Space>
     <Popconfirm
      title="Chắc chắn xoá"
      onConfirm={() => deleteVoucher(record._id as string)}>
      <Button icon={<DeleteOutlined />} />
     </Popconfirm>
    </Space>
   ),
  },
 ];
 useEffect(() => {
  getVoucher();
 }, []);

 return (
  <div>
   <Space>
    <Button onClick={() => setOpenAddVoucher(true)}>
     Thêm Voucher
    </Button>
   </Space>
   <Table
    dataSource={voucherList}
    columns={columns}
    bordered
    rowKey={() => Math.random()}
   />
   <AddVoucher
    visible={openAddVoucher}
    hide={() => setOpenAddVoucher(false)}
   />
  </div>
 );
}
