import { Form, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useAppSelector } from "app/store";
import {
 ICategory,
 ISubCategory,
} from "constants/models/category.model";
import { INSX, IProduct } from "constants/models/product.model";
import { useProduct } from "hook/useProduct";
import React, { useEffect, useState } from "react";
import _findIndex from "lodash/findIndex";
import { createRule } from "pages/client/cart/Payment";
import useStateRef from "react-usestateref";

interface Props {
 visible: boolean;
 onHide: () => void;
 product: IProduct;
}
export default function EditCategory({
 visible,
 onHide,
 product,
}: Props) {
 const { updateProduct } = useProduct();
 const [nsx, setNsx] = useState<ISubCategory[]>([]);
 const { categories } = useAppSelector().category;
 const { Option } = Select;
 const changeCategory = (id: string) => {
  const idx = _findIndex(categories, (n: ICategory) => n._id === id);
  setNsx(categories[idx].subCategory);
 };

 useEffect(() => {
  const idx = _findIndex(
   categories,
   (n: ICategory) => n._id === product?.category?._id
  );
  setNsx(categories?.[idx]?.subCategory);
 }, [product]);
 const [form] = Form.useForm();
 const onFinish = (values: any) => {
  updateProduct(product._id, {
   ...values,
  }).then(() => onHide());
 };
 return (
  <Modal
   title={"Cật nhật Danh mục và nhà sản xuất"}
   visible={visible}
   onOk={() => form.submit()}
   onCancel={() => onHide()}>
   <Form
    initialValues={{
     category: product?.category?._id,
     nsx: product?.nsx?._id,
    }}
    form={form}
    onFinish={onFinish}
    labelCol={{ span: 5 }}>
    <Form.Item
     name={"category"}
     label="Danh mục"
     rules={[
      {
       ...createRule("Danh mục"),
      },
     ]}>
     <Select
      onChange={(value) => changeCategory(value)}
      defaultValue={product?.category?._id}>
      {categories?.map((it: ICategory) => (
       <Option key={it._id} value={it._id}>
        {it.name}
       </Option>
      ))}
     </Select>
    </Form.Item>
    <Form.Item
     rules={[
      {
       ...createRule("Nhà sản xuât"),
      },
     ]}
     label="Nhà sản xuât"
     name="nsx">
     <Select defaultValue={product?.nsx?._id}>
      {nsx?.map((it: ISubCategory) => (
       <Option key={it._id} value={it._id}>
        {it.name}
       </Option>
      ))}
     </Select>
    </Form.Item>
   </Form>
  </Modal>
 );
}
