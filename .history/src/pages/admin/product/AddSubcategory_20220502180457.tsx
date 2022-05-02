import { Form, Input, Modal, Typography } from "antd";
import { ISubCategory } from "constants/models/category.model";
import { AddSubCategoryPayload } from "constants/payload/category.payload";
import { useResetFormOnCloseModal } from "hook/useResetFormModal";
import useNSX from "pages/admin/product/useNSX";
import { useForm } from "rc-field-form";
import React, { useCallback, useEffect, useState } from "react";
import { removeAccents } from "utils/common";
type Props = {
 visible: boolean;
 onHide: any;
 category: ISubCategory;
};
export default function AddSubcategory({
 onHide,
 visible,
 category,
}: Props) {
 const [form] = Form.useForm();
 const { addSubcategory } = useNSX();
 useResetFormOnCloseModal({ form, visible });
 const [name, setName] = useState("");
 const onSubmit = useCallback(
  (value: any) => {
   addSubcategory({
    category: category._id as string,
    name: value.name,
    path: removeAccents(value.name).toLowerCase(),
   });
   console.log();

   setName("");
  },
  [form]
 );

 return (
  <Modal
   visible={visible}
   onCancel={() => onHide(false)}
   onOk={form.submit}
   title="Thêm nhà sản xuất">
   <Form
    onFinish={onSubmit}
    form={form}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}>
    <Form.Item label="Tên nhà sản xuất">
     <Typography>{category?.name}</Typography>
    </Form.Item>
    <Form.Item label="Tên nhà sản xuất" name="name">
     <Input
      onChange={(e: any) => {
       e.preventDefault();
       setName(
        removeAccents(e?.target?.value)
         .toLowerCase()
         .replaceAll(" ", "-")
       );
      }}
     />
    </Form.Item>
    <Form.Item label="Đường dẫn">
     <Typography>{removeAccents(name)}</Typography>
    </Form.Item>
   </Form>
  </Modal>
 );
}
