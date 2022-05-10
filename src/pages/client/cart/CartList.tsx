import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button, InputNumber, Table, Tag } from "antd";
import { ColumnType } from "antd/lib/table";
import { useAppSelector } from "app/store";
import { ICartItemPreview } from "constants/models/cart.model";
import { useCart } from "hook/useCart";
import useDefineSearch from "hook/useDefineSearch";
import React from "react";
import { formatMoney } from "utils/common";

export default function CartList() {
 const { getColumnSearchProps } = useDefineSearch();
 const { removeCart, updateQuantity } = useCart();
 const { preview } = useAppSelector().cart;

 const columns: ColumnType<ICartItemPreview>[] = [
  {
   title: "Hình ảnh",
   dataIndex: "poster",
   width: "10%",
   render: (text: string, record: any) => (
    <Avatar src={record?.posters?.[0].url} size="large" />
   ),
  },
  {
   title: "Tên sản phẩm",
   dataIndex: "name",
   key: "name",
   width: "15%",
   ...(getColumnSearchProps("name") as Partial<ColumnType<any>>),
  },
  {
   title: "Size",
   dataIndex: "size",
   key: "size",
   width: "10%",
   render: (text) => <>{text}</>,
  },
  {
   title: "Đơn giá",
   dataIndex: "price",
   key: "price",
   width: "10%",
   render: (price: number) => (
    <Tag color={"green"}>{price && formatMoney(price)}</Tag>
   ),
  },
  {
   title: "Số lượng",
   dataIndex: "quantity",
   key: "quantity",
   width: "10%",
   render: (text: string, record: ICartItemPreview) => {
    return !record.isEmpty ? (
     <InputNumber
      min={1}
      defaultValue={(record?.quantity as any) || 0}
      onChange={(e: number) => {
       updateQuantity(record.idProduct, record.size, e);
      }}
     />
    ) : (
     <>Đã hết hàng</>
    );
   },
  },
  {
   title: "Tổng tiền",
   dataIndex: "cost",
   key: "cost",
   width: "10%",
   render: (cost: number) => (
    <Tag color={"green"}>{cost && formatMoney(cost)}</Tag>
   ),
  },
  {
   title: "Thao tác",
   width: "10%",
   render: (text: string, record: any) => (
    <Button
     icon={<DeleteOutlined />}
     onClick={() => removeCart(record.idProduct, record.size)}
    />
   ),
  },
 ];

 return (
  <div>
   <Table
    bordered
    dataSource={preview?.list || []}
    columns={columns}
    pagination={false}
    rowKey={(record) => Math.random()}
   />
  </div>
 );
}
