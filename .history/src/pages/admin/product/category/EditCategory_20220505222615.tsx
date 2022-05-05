import { UploadOutlined } from "@ant-design/icons";
import {
 Button,
 Col,
 Form,
 Image,
 Input,
 Modal,
 Row,
 Typography,
 Upload,
} from "antd";
import { ICategory } from "constants/models/category.model";
import React, { useEffect, useState } from "react";
import { removeAccents } from "utils/common";
type Props = {
 visible: boolean;
 hide: () => void;
 category: ICategory;
};
export default function EditCategory({
 hide,
 visible,
 category,
}: Props) {
 const [image, setImage] = useState("");
 const [name, setName] = useState("");

 useEffect(() => {
  setImage(category?.logos?.url);
  setName(category?.name);
 }, [category]);

 function getBase64(file: any) {
  return new Promise((resolve, reject) => {
   const reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = () => resolve(reader.result);
   reader.onerror = (error) => reject(error);
  });
 }
 const onChangeImage = async (file: any) => {
  const preview = await getBase64(file);
  setImage(preview as any);
 };

 return (
  <Modal
   footer={false}
   visible={visible}
   onCancel={() => hide()}
   title="Sửa danh mục">
   <Form labelCol={{ span: 5 }}>
    <Form.Item label="Tên danh mục" name="name">
     <Typography.Paragraph
      style={{ marginBottom: 0 }}
      editable={{
       onChange: (text: string) => setName(text),
      }}>
      {name || ""}
     </Typography.Paragraph>
    </Form.Item>
    <Form.Item label="Đường dẫn" name="path">
     <Typography>
      {removeAccents(name || "").replaceAll(" ", "-")}
     </Typography>
    </Form.Item>
    <Form.Item label="Hình ảnh">
     <Image width={"30%"} src={image} />
     <Upload
      maxCount={1}
      onChange={(file) => onChangeImage(file.file)}
      beforeUpload={true as any}>
      <a>Thay đổi logo</a>
     </Upload>
    </Form.Item>
   </Form>
  </Modal>
 );
}
