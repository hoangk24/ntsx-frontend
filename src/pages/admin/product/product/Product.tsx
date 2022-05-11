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
 Input,
 InputNumber,
 Popconfirm,
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
import EditCategory from "pages/admin/product/product/category/EditCategory";
import EditSize from "pages/admin/product/product/size/EditSize";
import React, { useState } from "react";
import { formatDate, formatMoney } from "utils/common";

export default function Product() {
 const [openAddModal, setOpenAddModal] = useState(false);
 const { deleteProduct, products, fetchProduct, updateProduct } =
  useProduct();
 const [openEditSize, setOpenEditSize] = useState({
  editing: false,
  product: {} as IProduct,
 });
 const { getColumnSearchProps } = useDefineSearch();
 const [openCategory, setOpenCategory] = useState({
  editing: false,
  product: {} as IProduct,
 });
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
   ...getColumnSearchProps("name"),
   render: (text, record) => (
    <Typography.Paragraph
     editable={{
      onChange: (text) => updateProduct(record._id, { name: text }),
     }}>
     {text}
    </Typography.Paragraph>
   ),
  },
  {
   title: "Đơn giá",
   dataIndex: "price",
   key: "price",
   render: (text, record) => (
    <InputNumber
     onChange={(value: number) =>
      updateProduct(record._id, { price: value })
     }
     min={1}
     defaultValue={text}
     addonAfter="VNĐ"
    />
   ),
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
     <Button
      onClick={() => {
       setOpenEditSize({
        editing: true,
        product: record,
       });
      }}
      icon={<EditOutlined />}
      block>
      Cật nhật
     </Button>
    </Space>
   ),
  },
  {
   title: "DM",
   dataIndex: "category",
   key: "category",
   render: (text, record) => (
    <Space>
     <Typography>
      {record.category.name} - {record.nsx.name}
     </Typography>
     <Button
      onClick={() =>
       setOpenCategory({
        editing: true,
        product: record,
       })
      }
      icon={<EditOutlined />}
     />
    </Space>
   ),
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
      <Popconfirm
       title="Bạn chắc chắn muốn xoá sản phẩm này!"
       onConfirm={() => deleteProduct(record._id)}>
       <Button icon={<DeleteOutlined />} />
      </Popconfirm>
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
     expandedRowRender: (record) => (
      <Typography.Paragraph
       editable={{
        onChange: (text) => updateProduct(record._id, { note: text }),
       }}>
       {record.note}
      </Typography.Paragraph>
     ),
    }}
    dataSource={products}
    columns={columns}
   />
   <AddProduct
    show={openAddModal}
    hide={() => setOpenAddModal(false)}
   />
   <EditSize
    product={openEditSize.product}
    onHide={() =>
     setOpenEditSize({ product: {} as IProduct, editing: false })
    }
    visible={openEditSize.editing}
   />
   <EditCategory
    product={openCategory.product}
    onHide={() =>
     setOpenCategory({ product: {} as IProduct, editing: false })
    }
    visible={openCategory.editing}
   />
  </div>
 );
}
