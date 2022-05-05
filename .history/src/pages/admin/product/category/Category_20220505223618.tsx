import {
 EditOutlined,
 PlusOutlined,
 UploadOutlined,
} from "@ant-design/icons";
import {
 Button,
 Card,
 Form,
 Image,
 Input,
 Space,
 Table,
 Tag,
 Typography,
 Upload,
} from "antd";
import { ColumnsType } from "antd/es/table";
import {
 ICategory,
 ISubCategory,
} from "constants/models/category.model";
import { IImage } from "constants/models/common.model";
import useUpload from "hook/useUpload";
import AddSubcategory from "pages/admin/product/category/AddSubcategory";
import useNSX from "pages/admin/product/category/useNSX";
import React, { useCallback, useState } from "react";

export default function Category() {
 const {
  categories,
  deleteNSX,
  addSubcategory,
  addCategory,
  updateCategory,
 } = useNSX();
 const [openAddCategory, setOpenAddCategory] = useState(false);
 const [openAddSubCate, setOpenAddSubCate] = useState(false);
 const [category, setCategory] = useState<any>();
 const { beforeUpload, fileList, onChangeFileList, onRemove } =
  useUpload();

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
       onChange: () => {},
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
   render: (logos: IImage) => {
    return (
     <Space>
      <Image src={logos?.url} width={100} />
      <Upload>
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
   render: (text: string, record: any, idx: number) => {
    return record.subCategory.map((it: ISubCategory) => (
     <Tag
      closable
      color={"green"}
      onClose={() => deleteNSX(record._id)}>
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
        <Button onClick={() => setOpenAddCategory(false)}>Huỷ</Button>
        <Button htmlType="submit">Thêm</Button>
       </Space>
      </Form>
     </Card>
    )}
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
