import {
 DeleteOutlined,
 EditOutlined,
 PlusOutlined,
 ReloadOutlined,
 UploadOutlined,
} from "@ant-design/icons";
import {
 Button,
 Card,
 Form,
 Image,
 Input,
 Popconfirm,
 Space,
 Table,
 Tag,
 Typography,
 Upload,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useAppSelector } from "app/store";
import {
 ICategory,
 ISubCategory,
} from "constants/models/category.model";
import { IImage } from "constants/models/common.model";
import { useCategory } from "hook/useCategory";
import { useNsx } from "hook/useNSX";
import useUpload from "hook/useUpload";
import AddSubcategory from "pages/admin/product/category/AddSubcategory";
import React, { useCallback, useState } from "react";
import { removeAccents } from "utils/common";

export default function Category() {
 const { deleteNSX, addSubcategory } = useCategory();
 const { categories } = useAppSelector().category;
 const [openAddCategory, setOpenAddCategory] = useState(false);
 const [openAddSubCate, setOpenAddSubCate] = useState(false);
 const [category, setCategory] = useState<any>();
 const { beforeUpload, fileList, onChangeFileList, onRemove } =
  useUpload();
 const {
  addCategory,
  fetchCategory,
  updateCategory,
  deleteCategory,
 } = useCategory();
 const [form] = Form.useForm();
 const column: ColumnsType<ICategory> = [
  {
   title: "Tên danh mục",
   dataIndex: "name",
   key: "name",
   render: (text, record) => {
    return (
     <Typography.Paragraph
      editable={{
       onChange: (text) => {
        const data = {
         name: text,
         path: removeAccents(text).replaceAll(" ", "-").toLowerCase(),
        };
        updateCategory(record._id, data);
       },
      }}>
      {text}
     </Typography.Paragraph>
    );
   },
  },
  {
   title: "Logo",
   dataIndex: "logos",
   key: "logos",
   render: (logos: IImage, record) => {
    return (
     <Space>
      <Image src={logos?.url} width={100} />
      <Upload
       onChange={(file) =>
        updateCategory(record._id, null, file.file.originFileObj)
       }>
       <Button icon={<EditOutlined />} />
      </Upload>
     </Space>
    );
   },
  },

  {
   title: "NSX",
   dataIndex: "nsx",
   key: "nsx",
   render: (text, record, idx: number) => {
    return record.subCategory.map((it: ISubCategory) => (
     <Tag
      key={it._id}
      closable
      color={"green"}
      onClose={() =>
       deleteNSX({ category: record._id, nsx: it._id })
      }>
      {it.name}
     </Tag>
    ));
   },
  },
  {
   title: "Thao tác",
   render: (text: string, record: any, idx: number) => (
    <Space>
     <Button
      icon={<PlusOutlined />}
      onClick={() => {
       setCategory(record);
       setOpenAddSubCate(true);
      }}
     />

     <Popconfirm
      title="Bạn chắc chắn muốn xoá danh mục này này!"
      onConfirm={() => deleteCategory(record._id)}>
      <Button icon={<DeleteOutlined />} />
     </Popconfirm>
    </Space>
   ),
  },
 ];
 const onFinish = useCallback(
  (values) => {
   let formData = new FormData();
   formData.append("name", values.name);
   formData.append("path", (values.name as string).toLowerCase());
   formData.append("logo", values.logo.fileList[0].originFileObj);
   addCategory(formData);
  },
  [form]
 );

 return (
  <>
   <Space>
    <Space className="my-2" direction="vertical">
     <Button
      onClick={() => setOpenAddCategory(true)}
      icon={<PlusOutlined />}>
      Thêm danh mục
     </Button>
     {openAddCategory && (
      <Card>
       <Form onFinish={onFinish} labelCol={{ span: 12 }}>
        <Form.Item label="Tên danh mục" name="name">
         <Input />
        </Form.Item>
        <Form.Item label="Hình ảnh" name="logo">
         <Upload
          fileList={fileList}
          beforeUpload={beforeUpload}
          onChange={onChangeFileList}>
          {!fileList.length && <Button icon={<UploadOutlined />} />}
         </Upload>
        </Form.Item>
        <Space>
         <Button onClick={() => setOpenAddCategory(false)}>
          Huỷ
         </Button>
         <Button htmlType="submit">Thêm</Button>
        </Space>
       </Form>
      </Card>
     )}
    </Space>
    <Button icon={<ReloadOutlined />} onClick={() => fetchCategory()}>
     Làm mói
    </Button>
   </Space>
   <Table
    dataSource={categories}
    columns={column}
    rowKey={(record) => Math.random()}
   />
   {category && (
    <AddSubcategory
     category={category}
     visible={openAddSubCate}
     onHide={setOpenAddSubCate}
    />
   )}
  </>
 );
}
