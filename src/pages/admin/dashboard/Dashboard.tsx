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
 Button,
 Calendar,
 Card,
 Col,
 DatePicker,
 Form,
 message,
 Row,
 Space,
 Table,
 Typography,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { ICart } from "constants/models/cart.model";
import { IProduct } from "constants/models/product.model";
import moment from "moment";
import useDashboard from "pages/admin/dashboard/useDashboard";
import React, { useCallback, useEffect, useState } from "react";
import { formatMoney } from "utils/common";
import "./Dashboard.scss";
export default function Dashboard() {
 const { getHome, data, columnsCart, columnsProduct, columnsCost } =
  useDashboard();
 useEffect(() => {
  getHome();
 }, []);
 const [form] = Form.useForm();

 const onFinish = useCallback(
  (values) => {
   const startDate = new Date(moment(values.time[0]).toISOString());
   const endDate = new Date(moment(values.time[1]).toISOString());
   getHome({ startDate, endDate });
  },
  [form]
 );
 return (
  <Space className="dashboard" direction="vertical">
   <div className="">
    <Form onFinish={onFinish} layout="inline">
     <Form.Item
      label="Thời gian thống kê"
      name={"time"}
      rules={[
       { required: true, message: "Không được để trống!" },
       ({ getFieldValue }) => ({
        validator(_, value) {
         if (value && moment(value[0]).isAfter(moment(value[1]))) {
          return Promise.reject(
           "Ngày bắt đầu không được nhỏ hơn ngày kết thúc!"
          );
         }
         if (value && moment(value[1]).isAfter(moment(Date.now()))) {
          return Promise.reject(
           "Ngày kết thúc đang lớn hơn ngày hiện tại!"
          );
         }
         return Promise.resolve();
        },
       }),
      ]}>
      <DatePicker.RangePicker />
     </Form.Item>
     <Form.Item>
      <Button htmlType="submit">Thống kê</Button>
     </Form.Item>
    </Form>
   </div>
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
     <Typography>Danh sách đơn hàng gần đây</Typography>
     <Table
      rowKey={() => Math.random()}
      dataSource={data?.cartTable}
      columns={columnsCart}
      bordered
     />
    </Col>
    <Col span={12}>
     <Typography>Thời gian </Typography>
     <div className="site-calendar-demo-card">
      <Calendar fullscreen={false} />
     </div>
    </Col>
    <Col span={12}>
     <Typography>Top sản phẩm bán chạy</Typography>
     <Table
      rowKey={() => Math.random()}
      dataSource={data?.saleTable || []}
      columns={columnsProduct}
      bordered
     />
    </Col>
    <Col span={12}>
     <Typography>Top doanh thu sản phẩm </Typography>
     <Table
      rowKey={() => Math.random()}
      dataSource={data?.costTable || []}
      columns={columnsCost}
      bordered
     />
    </Col>
   </Row>
  </Space>
 );
}
