import { LoadingOutlined } from "@ant-design/icons";
import { Avatar, Badge, Space } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useAppDispatch } from "app/store";
import { ICart } from "constants/models/cart.model";
import { IProduct } from "constants/models/product.model";
import { Moment } from "moment";
import React, { useState } from "react";
import { getDashboard } from "services/dashboard.service";
import { formatMoney } from "utils/common";

interface DashboardHome {
 users: number;
 product: number;
 carts: number;
 cartTable: ICart[];
 totalCost: number;
 saleTable: any;
 costTable: any;
}
export default function useDashboard() {
 const dispatch = useAppDispatch();
 const [data, setData] = useState<DashboardHome>();

 const getHome = async (data?: { startDate: any; endDate: any }) => {
  try {
   const res: any = await getDashboard(data);
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
 const columnsProduct: ColumnsType<any> = [
  {
   title: "Sản phẩm",
   dataIndex: "",
   render: (text, record) => {
    return (
     <Avatar
      key={Math.random()}
      src={record?.infoProduct?.posters?.[0]?.url}
     />
    );
   },
  },
  {
   title: "Tên sản phẩm",
   dataIndex: "infoProduct.name",
   render: (text, record) => <>{record?.infoProduct?.name}</>,
  },
  {
   title: "Số lượng bán ra",
   dataIndex: "totalQuantity",
  },
 ];

 const columnsCost: ColumnsType<any> = [
  {
   title: "Sản phẩm",
   dataIndex: "",
   render: (text, record) => {
    return (
     <Avatar
      key={Math.random()}
      src={record?.infoProduct?.posters?.[0]?.url}
     />
    );
   },
  },
  {
   title: "Tên sản phẩm",
   dataIndex: "infoProduct.name",
   render: (text, record) => <>{record?.infoProduct?.name}</>,
  },
  {
   title: "Tổng tiền bán",
   dataIndex: "totalCost",
   render: (text) => <>{formatMoney(text)}</>,
  },
 ];
 return { getHome, data, columnsCart, columnsProduct, columnsCost };
}
