import {
 BarcodeOutlined,
 BarsOutlined,
 DeleteOutlined,
 EditOutlined,
 PlusOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Space, Table, Tabs } from "antd";
import { IImage } from "constants/models/common.model";
import useDefineSearch from "hook/useDefineSearch";
import AddProduct from "pages/admin/product/AddProduct";
import Category from "pages/admin/product/category/Category";
import NSX from "pages/admin/product/NSX";
import useLogicProduct from "pages/admin/product/useLogicProduct";
import React, { useEffect, useState } from "react";
import { formatDate, formatMoney } from "utils/common";

export default function Product() {
 const [openAddModal, setOpenAddModal] = useState(false);
 const [openNSXModal, setOpenNSXModal] = useState(false);
 const { deleteProduct, products, addProduct, fetchProduct } =
  useLogicProduct();
 const { getColumnSearchProps } = useDefineSearch();
 const columns = [
  {
   title: "Hình ảnh",
   dataIndex: "posters",
   key: "poster",
   render: (posters: IImage[]) => {
    return (
     <Avatar.Group>
      {posters.map((it: IImage) => (
       <Avatar key={Math.random()} src={it.url} />
      ))}
     </Avatar.Group>
    );
   },
  },
  {
   title: "Tên sản phẩm",
   dataIndex: "name",
   key: "name",
   ...getColumnSearchProps("name"),
  },
  {
   title: "Đơn giá",
   dataIndex: "price",
   key: "price",
   render: (price: any) => {
    return <div>{formatMoney(price)}</div>;
   },
  },
  {
   title: "Giảm giá",
   dataIndex: "discount",
   key: "discount",
  },
  {
   title: "Danh mục",
   dataIndex: "category",
   key: "category",
   render: (text: string, record: any, index: number) => {
    return <div>{record.category.name}</div>;
   },
  },
  {
   title: "Nhà sản xuất",
   dataIndex: "nsx",
   key: "nsx",
   render: (text: string, record: any, index: number) => {
    return <div>{record.nsx.name}</div>;
   },
  },
  {
   title: "Thời gian",
   dataIndex: "createAt",
   render: (text: string, record: any, index: number) => {
    return (
     <>
      <div>Ngày tạo: {formatDate(record.createdAt)}</div>
      <div>Cật nhật: {formatDate(record.updatedAt)}</div>
     </>
    );
   },
  },
  {
   title: "Thao tác",
   key: "action",
   render: (text: string, record: any, index: number) => {
    return (
     <>
      <Button
       onClick={() => deleteProduct(record._id)}
       icon={<DeleteOutlined />}
      />
      <Button icon={<EditOutlined />} />
     </>
    );
   },
  },
 ];
 useEffect(() => {
  fetchProduct();
 }, []);

 return (
  <div className="product">
   <Space className="product__header py-2">
    <Button
     onClick={() => setOpenNSXModal(true)}
     icon={<BarsOutlined />}>
     Danh mục
    </Button>
    <Button
     icon={<PlusOutlined />}
     onClick={() => setOpenAddModal(true)}>
     Thêm sản phẩm
    </Button>
   </Space>
   <div className="product__content">
    <Tabs defaultActiveKey="1">
     <Tabs.TabPane tab="Sản phẩm" key={1}>
      <Table
       bordered
       dataSource={products}
       columns={columns}
       rowKey={(record) => Math.random()}
      />
     </Tabs.TabPane>
     <Tabs.TabPane tab="Danh mục" key={2}>
      <Category />
     </Tabs.TabPane>
    </Tabs>
   </div>
   <div className="product__footer"></div>
   {/* <AddProduct
    onAddProduct={addProduct}
    hide={setOpenAddModal}
    show={openAddModal}
   />
   <NSX visible={openNSXModal} setVisible={setOpenNSXModal} /> */}
  </div>
 );
}
