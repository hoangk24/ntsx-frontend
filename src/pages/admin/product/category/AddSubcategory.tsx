import { Form, Input, Modal, Typography } from "antd";
import { ISubCategory } from "constants/models/category.model";
import { useResetFormOnCloseModal } from "hook/useResetFormModal";
import { useNsx } from "hook/useNSX";
import React, { useCallback, useState } from "react";
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
 const { addSubcategory } = useNsx();
 useResetFormOnCloseModal({ form, visible });
 const [name, setName] = useState("");

 const onSubmit = useCallback(
  (value: any) => {
   const data = {
    category: category._id as string,
    name: value.name,
    path: removeAccents(value.name)
     .toLowerCase()
     .replaceAll(" ", "-"),
   };
   addSubcategory(data, () => onHide(false));
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
