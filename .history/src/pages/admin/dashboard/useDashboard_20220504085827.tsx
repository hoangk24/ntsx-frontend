import { LoadingOutlined } from "@ant-design/icons";
import { Avatar, Badge, Space } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useAppDispatch } from "app/store";
import { ICart } from "constants/models/cart.model";
import { IProduct } from "constants/models/product.model";
import React, { useState } from "react";
import { getDashboard } from "services/dashboard.service";
import { formatMoney } from "utils/common";

interface DashboardHome {
 users: number;
 product: number;
 carts: number;
 cartTable: ICart[];
 totalCost: number;
}
export default function useDashboard() {
 const dispatch = useAppDispatch();
 const [data, setData] = useState<DashboardHome>();

 const getHome = async () => {
  try {
   const res: any = await getDashboard();

   setData(res.data.data);
  } catch (error) {}
 };
 const columnsCart: ColumnsType<ICart> = [
  {
   title: "Sản phẩm",
   dataIndex: "list",
   render: (text, record) => {
    return (
     <>
      <Avatar.Group>
       {record.list.map((it) => (
        <Avatar
         key={Math.random()}
         src={(it.idProduct as any).posters[0].url}
        />
       ))}
      </Avatar.Group>
     </>
    );
   },
  },
  {
   title: "Người nhận",
   render: (text, record) => {
    return <>{record?.fullName}</>;
   },
  },
  {
   title: "Tổng đơn",
   dataIndex: "finalCost",
   render: (text, record) => formatMoney(text),
  },
  {
   title: "Thanh toán",
   render: (text, record) => (
    <Badge
     color={record.isPaided ? "green" : "red"}
     text={record.isPaided ? "Đã thanh toán" : "Chưa thanh toán"}
    />
   ),
  },
  {
   title: "Trạng thái",
   render: (text, record) => (
    <Space>
     <LoadingOutlined />
     Chờ xác nhận
    </Space>
   ),
  },
 ];
 const columnsProduct: ColumnsType<IProduct> = [
  {
   title: "Sản phẩm",
   dataIndex: "list",
   render: (text, record) => {
    return (
     <>
      <Avatar.Group>
       {record.posters.map((it) => (
        <Avatar key={Math.random()} src={it.url} />
       ))}
      </Avatar.Group>
     </>
    );
   },
  },
  {
   title: "Tên sản phẩm",
   dataIndex: "name",
  },
  {
   title: "Số lượng bán ra",
   dataIndex: "",
  },
 ];
 return { getHome, data, columnsCart, columnsProduct };
}
