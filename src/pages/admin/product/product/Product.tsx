import {
 DeleteOutlined,
 EditOutlined,
 PlusOutlined,
 ReloadOutlined,
} from "@ant-design/icons";
import {
 Avatar,
 Badge,
 Button,
 Form,
 Select,
 Space,
 Table,
 Typography,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { useAppSelector } from "app/store";
import { ICategory } from "constants/models/category.model";
import { IImage } from "constants/models/common.model";
import { IProduct, ISizes } from "constants/models/product.model";
import useDefineSearch from "hook/useDefineSearch";
import { useProduct } from "hook/useProduct";
import AddProduct from "pages/admin/product/product/AddProduct";
import React, { useState } from "react";
import { formatDate } from "utils/common";

export default function Product() {
 const [openAddModal, setOpenAddModal] = useState(false);
 const { deleteProduct, products, fetchProduct } = useProduct();
 const { getColumnSearchProps } = useDefineSearch();
 const { categories } = useAppSelector().category;
 const { Option } = Select;
 const columns: ColumnsType<IProduct> = [
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
  },
  {
   title: "Đơn giá",
   dataIndex: "price",
   key: "price",
  },
  {
   title: "Size - Số lượng",
   dataIndex: "size",
   key: "size",
   render: (text, record) => (
    <Space direction="vertical">
     {record.size.map((it: ISizes) => (
      <Badge
       color={it.quantity > 0 ? "green" : "red"}
       text={`Size ${it.size} - ${it.quantity} Đôi`}
      />
     ))}
    </Space>
   ),
  },
  {
   title: "DM",
   dataIndex: "category",
   key: "category",
   render: (text, record) => <>{record.category.name}</>,
  },
  {
   title: "NSX",
   dataIndex: "nsx",
   key: "nsx",
   render: (text, record) => <>{record.nsx.name}</>,
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
   render: (text: string, record: any, index: number) => {
    return (
     <Space>
      <Button
       onClick={() => deleteProduct(record._id)}
       icon={<DeleteOutlined />}
      />
      <Button onClick={() => {}} icon={<EditOutlined />} />
     </Space>
    );
   },
  },
 ];

 return (
  <div className="product">
   <Space className="product__header py-2">
    <Button
     icon={<PlusOutlined />}
     onClick={() => setOpenAddModal(true)}>
     Thêm sản phẩm
    </Button>
    <Button onClick={() => fetchProduct()} icon={<ReloadOutlined />}>
     Làm mới
    </Button>
   </Space>
   <Table
    rowKey={(record) => record._id}
    expandable={{
     expandedRowRender: (record) => <p>{record.note}</p>,
    }}
    dataSource={products}
    columns={columns}
   />
   <AddProduct
    show={openAddModal}
    hide={() => setOpenAddModal(false)}
   />
  </div>
 );
}
