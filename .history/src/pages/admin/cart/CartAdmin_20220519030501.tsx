import { Button, Form, Space, Table, Tabs } from "antd";
import { ColumnsType } from "antd/lib/table";
import { CartStatus, ICart } from "constants/models/cart.model";
import { useCart } from "hook/useCart";
import useDefineSearch from "hook/useDefineSearch";
import { useLoading } from "hook/useLoading";
import _filter from "lodash/filter";
import React, { useEffect } from "react";
import { formatDate, formatMoney } from "utils/common";
import "./CartAdmin.scss";
export default function CartAdmin() {
 const { changeStatus, data, getAllCart } = useCart();
 const { TabPane } = Tabs;
 const { getColumnSearchProps } = useDefineSearch();
 const loading = useLoading();
 const columns: ColumnsType<ICart> = [
  {
   title: "Mã đơn hàng",
   dataIndex: "_id",
   ...getColumnSearchProps("_id"),
  },
  {
   title: "Thông tin người nhận",
   render: (text, record) => {
    return (
     <Form className="" labelCol={{ span: 9 }}>
      <Form.Item label="Người nhận">
       <div className="">{record?.fullName || ""}</div>
      </Form.Item>
      <Form.Item label="Số điện thoại">
       <div className="">{record.phoneNumber}</div>
      </Form.Item>
      <Form.Item label="Địa chỉ">
       <div className="">{record.address}</div>
      </Form.Item>
      <Form.Item label="Ngày mua">
       <div className="">{formatDate(record.createdAt)}</div>
      </Form.Item>
     </Form>
    );
   },
  },
  {
   title: "Ghi chú",
   dataIndex: "note",
   render: () => <>Giao hàng nhanh</>,
  },
  {
   title: "Danh sách mặt hàng",
   dataIndex: "list",
   render: (text, record) => {
    const { list } = record;

    const mapList = list.map((it: any) => {
     return (
      <div>{`${it?.idProduct?.name}-${it.size} x ${it.quantity}`}</div>
     );
    });
    return <>{mapList}</>;
   },
  },
  {
   title: "Thanh toán",
   render: (text, record) => (
    <Form labelCol={{ span: 10 }}>
     <Form.Item label="Ước tính">
      {formatMoney(record.totalCost)}
     </Form.Item>
     <Form.Item label="Giảm giá">{record.discount || 0}</Form.Item>
     <Form.Item label="Tổng số lượng">
      {record.totalQuantity || 0}
     </Form.Item>
     <Form.Item label="Thanh toán">
      {formatMoney(record.finalCost)}
     </Form.Item>
    </Form>
   ),
  },
  {
   title: "Trạng thái",
   dataIndex: "status",
   render: (text, record) => (
    <>{!record.isPaided ? "Chưa thanh toán" : "Đã thanh toán"}</>
   ),
  },
  {
   title: "Thao tác",
   render: (text, record) => {
    return (
     <Space>
      {record.status === CartStatus.CREATING && (
       <Button
        onClick={() => {
         loading?.show();
         changeStatus({
          id: record._id,
          status: CartStatus.CONFIRM,
         }).finally(() => loading?.hide());
        }}>
        Xác nhận
       </Button>
      )}
      {record.status === CartStatus.CONFIRM && (
       <Button
        onClick={() => {
         loading?.show();
         changeStatus({
          id: record._id,
          status: CartStatus.SHIPPING,
         }).finally(() => loading?.hide());
        }}>
        Đã vận chuyển
       </Button>
      )}
      {record.status === CartStatus.SHIPPING && (
       <Button
        onClick={() => {
         loading?.show();
         changeStatus({
          id: record._id,
          status: CartStatus.DONE,
         }).finally(() => loading?.hide());
        }}>
        Thành công
       </Button>
      )}
      {record.status === CartStatus.DONE && <>Giao thành công</>}
      {![
       CartStatus.DONE,
       CartStatus.CANCLE,
       CartStatus.SHIPPING,
      ].includes(record.status) && (
       <Button
        onClick={() => {
         loading?.show();
         changeStatus({
          id: record._id,
          status: CartStatus.CONFIRM,
         }).finally(() => loading?.hide());
        }}>
        Huỷ
       </Button>
      )}
     </Space>
    );
   },
  },
 ];
 useEffect(() => {
  getAllCart();
 }, []);

 return (
  <div className="cart-admin">
   <Tabs defaultActiveKey="1">
    <TabPane tab="Chờ xác nhận" key="1">
     <Table
      bordered
      columns={columns}
      dataSource={_filter(
       data,
       (n) => n.status === CartStatus.CREATING
      )}
     />
    </TabPane>
    <TabPane tab="Đã xác nhận" key="2">
     <Table
      bordered
      columns={columns}
      dataSource={_filter(
       data,
       (n) => n.status === CartStatus.CONFIRM
      )}
     />
    </TabPane>
    <TabPane tab="Vận chuyển" key="3">
     <Table
      bordered
      columns={columns}
      dataSource={_filter(
       data,
       (n) => n.status === CartStatus.SHIPPING
      )}
     />
    </TabPane>
    <TabPane tab="Xong" key="5">
     <Table
      bordered
      columns={columns}
      dataSource={_filter(data, (n) => n.status === CartStatus.DONE)}
     />
    </TabPane>
    <TabPane tab="Huỷ" key="6">
     <Table
      bordered
      columns={columns}
      dataSource={_filter(
       data,
       (n) => n.status === CartStatus.CANCLE
      )}
     />
    </TabPane>
   </Tabs>
  </div>
 );
}
