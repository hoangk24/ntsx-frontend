import { PlusOutlined } from "@ant-design/icons";
import {
 Button,
 Form,
 Input,
 InputNumber,
 message,
 Modal,
 Select,
 Typography,
 Upload,
} from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { RootState } from "app/store";
import {
 ICategory,
 ISubCategory,
} from "constants/models/category.model";
import useUpload from "hook/useUpload";
import SizeForm from "pages/admin/product/AddSizeModal";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
type Props = {
 show: any;
 hide: React.Dispatch<React.SetStateAction<boolean>>;
 onAddProduct: any;
};
export default function AddProduct(props: Props) {
 const { hide, show, onAddProduct } = props;
 const [onOpenSizeModal, setOnOpenSizeModal] = useState(false);
 const categories = useSelector((state: RootState) => state.category);
 const { Option } = Select;
 const { fileList, onChangeFileList, beforeUpload, onRemove } =
  useUpload();
 const [cateSelected, setCateSelected] = useState<ISubCategory[]>([]);
 const [form] = Form.useForm();

 const changeCate = (value: string) => {
  // const selected = categories.findIndex(
  //  (item: Category) => item._id === value
  // );
  // setCateSelected(categories[selected]?.subCategory || []);
 };

 const onSubmit = useCallback(
  (value: any) => {
   let formData = new FormData();
   if (fileList.length < 4) {
    message.error("Phải có đủ 4 ảnh");
    return;
   }
   fileList.forEach((item: UploadFile) => {
    formData.append("posters", item.originFileObj as any);
   });
   formData.append("name", value.name);
   formData.append("note", value.note);
   formData.append("size", JSON.stringify(value.size));
   formData.append("nsx", value.nsx);
   formData.append("category", value.category);
   formData.append("price", value.price);
   onAddProduct(formData);
  },
  [form, fileList]
 );

 return (
  <Modal
   title="Thêm sản phẩm"
   onOk={() => form.submit()}
   visible={show}
   onCancel={() => hide(false)}>
   <Form.Provider
    onFormFinish={(name: any, { values, forms }: any) => {
     if (name === "sizeForm") {
      const { productForm } = forms;
      const sizes = productForm.getFieldValue("size") || [];
      productForm.setFieldsValue({
       size: [...sizes, values],
      });
      setOnOpenSizeModal(false);
     }
    }}>
    <Form
     onFinish={onSubmit}
     name="productForm"
     form={form}
     labelCol={{ span: 5 }}
     wrapperCol={{ span: 15 }}>
     <Form.Item label="Tên sản phẩm" name="name">
      <Input placeholder="Nhập tên sản phẩm" />
     </Form.Item>
     <Form.Item label="Đơn giá" name="price">
      <InputNumber
       placeholder="Nhập đơn giá"
       width={300}
       addonAfter="VNĐ"
      />
     </Form.Item>
     <Form.Item label="Mô tả" name="note">
      <Input.TextArea placeholder="Nhập mô tả sản phẩm" />
     </Form.Item>
     <Form.Item label="Danh mục" name="category">
      <Select onChange={changeCate}>
       {/* {categories?.map((item: ICategory, idx: number) => (
        <Option key={Math.random()} value={item._id}>
         {item.name}
        </Option>
       ))} */}
      </Select>
     </Form.Item>
     <Form.Item label="Nhà sản xuất" name="nsx">
      <Select>
       {cateSelected?.map((item: ISubCategory, idx: number) => (
        <Option key={idx + Math.random()} value={item._id}>
         {item.name}
        </Option>
       ))}
      </Select>
     </Form.Item>
     <Form.Item label="Hình ảnh">
      <Upload
       accept=".jpg, .jpeg, .png"
       fileList={fileList}
       onRemove={onRemove}
       beforeUpload={beforeUpload}
       listType="picture-card"
       maxCount={4}
       multiple
       onChange={onChangeFileList}>
       {fileList.length < 4 && "+ Upload"}
      </Upload>
     </Form.Item>
     <Form.Item
      label="Size"
      name="size"
      dependencies={["size"]}
      shouldUpdate={(prevValues, curValues) => {
       return prevValues.size !== curValues.size;
      }}>
      {({ getFieldValue }) => {
       const sizes = getFieldValue("size") || [];

       return sizes.length ? (
        <ul>
         {sizes.map((size: any, index: number) => (
          <li key={index} className="user">
           {size.size} - {size.quantity}
          </li>
         ))}
        </ul>
       ) : (
        <Typography.Text className="ant-form-text" type="secondary">
         No user yet.
        </Typography.Text>
       );
      }}
      <Button
       type="dashed"
       onClick={() => setOnOpenSizeModal(true)}
       icon={<PlusOutlined />}>
       Thêm size
      </Button>
     </Form.Item>
    </Form>
    <SizeForm
     visible={onOpenSizeModal}
     onCancel={() => setOnOpenSizeModal(false)}
    />
   </Form.Provider>
  </Modal>
 );
}
