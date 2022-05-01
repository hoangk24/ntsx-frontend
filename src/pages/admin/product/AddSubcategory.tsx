import { Form, Input, Modal, Typography } from "antd";
import { ISubCategory } from "constants/models/category.model";
import { AddSubCategoryPayload } from "constants/payload/category.payload";
import { useResetFormOnCloseModal } from "hook/useResetFormModal";
import { useForm } from "rc-field-form";
import React, { useCallback, useEffect, useState } from "react";
import { removeAccents } from "utils/common";
type Props = {
 visible: boolean;
 onHide: any;
 onAddSubCate: any;
 category: ISubCategory;
};
export default function AddSubcategory({
 onHide,
 visible,
 onAddSubCate,
 category,
}: Props) {
 const [form] = Form.useForm();
 useResetFormOnCloseModal({ form, visible });
 const [name, setName] = useState("");
 const onSubmit = useCallback(
  (value: any) => {
   onAddSubCate({
    category: category._id,
    name: value.name,
    path: removeAccents(value.name),
   });
   form.resetFields();
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
     <Typography>{category.name}</Typography>
    </Form.Item>
    <Form.Item label="Tên nhà sản xuất" name="name">
     <Input
      onChange={(e: any) => {
       e.preventDefault();
       setName(e?.target?.value);
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
