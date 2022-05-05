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
 }, [category]);
 useEffect(() => {
  console.log(image);
 }, [image]);
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
   visible={visible}
   onCancel={() => hide()}
   title="Sửa danh mục">
   <Form>
    <Form.Item label="Tên danh mục" name="name">
     <Typography.Paragraph
      style={{ marginBottom: 0 }}
      editable={{
       onChange: (text: string) => setName(text),
      }}>
      {category?.name}
     </Typography.Paragraph>
    </Form.Item>
    <Form.Item label="Đường dẫn" name="path">
     <Typography></Typography>
    </Form.Item>
    <Form.Item label="Hình ảnh">
     <Image src={image} />
     <Upload
      maxCount={1}
      onChange={(file) => onChangeImage(file.file)}
      beforeUpload={true as any}>
      <a>Click here to upload</a>
     </Upload>
    </Form.Item>
   </Form>
  </Modal>
 );
}
