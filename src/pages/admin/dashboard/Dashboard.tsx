import {
 CodeSandboxOutlined,
 LoadingOutlined,
 MoneyCollectOutlined,
 ShoppingOutlined,
 UserOutlined,
} from "@ant-design/icons";
import {
 Avatar,
 Badge,
 Calendar,
 Card,
 Col,
 Row,
 Space,
 Table,
 Typography,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { ICart } from "constants/models/cart.model";
import { IProduct } from "constants/models/product.model";
import useDashboard from "pages/admin/dashboard/useDashboard";
import React, { useEffect } from "react";
import { formatMoney } from "utils/common";
import "./Dashboard.scss";
export default function Dashboard() {
 const { getHome, data, columnsCart, columnsProduct } =
  useDashboard();
 useEffect(() => {
  getHome();
 }, []);

 return (
  <div className="dashboard">
   <Row gutter={[15, 15]}>
    <Col span={6}>
     <Card hoverable title="Tổng thành viên">
      {data?.users} <UserOutlined />
     </Card>
    </Col>
    <Col span={6}>
     <Card hoverable title="Đơn hàng">
      {data?.carts}
      <ShoppingOutlined />
     </Card>
    </Col>
    <Col span={6}>
     <Card hoverable title="Tổng sản phẩm">
      {data?.product} <CodeSandboxOutlined />
     </Card>
    </Col>
    <Col span={6}>
     <Card hoverable title="Tổng tiền bán">
      {formatMoney(data?.totalCost || 0)} <MoneyCollectOutlined />
     </Card>
    </Col>
    <Col span={12}>
     <div className="my-2">
      <Typography>Danh sách đơn hàng gần đây</Typography>
      <Table
       rowKey={() => Math.random()}
       dataSource={data?.cartTable}
       columns={columnsCart}
       bordered
      />
     </div>
     <div className="Sản phẩm bán chạy">
      <Typography>Danh sách đơn hàng gần đây</Typography>
      <Table
       rowKey={() => Math.random()}
       dataSource={[]}
       columns={columnsProduct}
       bordered
      />
     </div>
    </Col>
    <Col span={12}>
     <Calendar />
    </Col>
   </Row>
  </div>
 );
}
