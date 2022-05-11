import {
 Button,
 Col,
 Descriptions,
 Form,
 Input,
 InputNumber,
 message,
 Row,
 Space,
 Typography,
} from "antd";
import Modal from "antd/lib/modal/Modal";
import { IProduct, ISizes } from "constants/models/product.model";
import useSize from "pages/admin/product/product/size/useSize";
import React, { useEffect, useMemo, useState } from "react";
import _isNumber from "lodash/isNumber";
import { useProduct } from "hook/useProduct";
import { createRule } from "pages/client/cart/Payment";
import { DeleteOutlined } from "@ant-design/icons";
interface Props {
 visible: boolean;
 onHide: () => void;
 product: IProduct;
}
export default function EditSize({
 visible,
 onHide,
 product,
}: Props) {
 const formItemLayout = {
  labelCol: {
   xs: { span: 24 },
   sm: { span: 4 },
  },
  wrapperCol: {
   xs: { span: 24 },
   sm: { span: 20 },
  },
 };
 const formItemLayoutWithOutLabel = {
  wrapperCol: {
   xs: { span: 24, offset: 0 },
   sm: { span: 20, offset: 4 },
  },
 };
 const {
  updateSizeObject,
  addSize,
  setList,
  list,
  reload,
  removeSize,
 } = useSize();
 const [newSize, setNewSize] = useState<ISizes>({} as ISizes);

 useEffect(() => {
  const sizes = product.size || [];
  setList(sizes);
 }, [product]);

 const mapList = useMemo(() => {
  return (
   <>
    {list?.map((it: ISizes) => (
     <Form.Item key={it._id} label="Size">
      <Space>
       <Typography.Paragraph
        editable={{
         onChange: (text) =>
          updateSizeObject({
           _id: it._id,
           size: text,
          }),
        }}
        className="m-0">
        {it.size}
       </Typography.Paragraph>
       - Số lượng
       <Typography.Paragraph
        editable={{
         onChange: (text) => {
          if (/^[0-9]*$/.test(text)) {
           updateSizeObject({
            _id: it._id,
            quantity: parseInt(text),
           });
          } else {
           message.error("Hãy nhập ký tự số");
          }
         },
        }}
        className="m-0">
        {it.quantity.toString()}
       </Typography.Paragraph>
       <Button
        onClick={() => removeSize(it._id as string)}
        icon={<DeleteOutlined />}
       />
      </Space>
     </Form.Item>
    ))}
   </>
  );
 }, [reload, list]);
 const { updateProduct } = useProduct();
 const onOK = () => {
  updateProduct(product._id, {
   size: list.map((it: ISizes) => ({
    size: it.size,
    quantity: it.quantity,
   })),
  }).then(() => onHide());
 };
 const onFinish = (value: any) => {
  addSize({
   ...newSize,
   _id: Math.random().toString(),
  });
 };
 return (
  <Modal
   title={"Cật nhật Size và số lượng"}
   visible={visible}
   onOk={onOK}
   onCancel={() => onHide()}>
   {mapList}
   <Form onFinish={onFinish} labelCol={{ span: 4 }}>
    <Form.Item
     label={"Size"}
     name="size"
     rules={[{ ...createRule("Size") }]}>
     <Input
      placeholder="Nhập size"
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
       setNewSize({
        ...newSize,
        size: event.target.value,
       })
      }
     />
    </Form.Item>
    <Form.Item
     label="Số lượng"
     name="quantity"
     rules={[{ ...createRule("Số lượng") }]}>
     <InputNumber
      style={{ width: "100%" }}
      placeholder="Nhập số lượng của size"
      onChange={(value: number) =>
       setNewSize({
        ...newSize,
        quantity: value,
       })
      }
     />
    </Form.Item>
    <Form.Item>
     <Button htmlType="submit" block>
      Thêm
     </Button>
    </Form.Item>
   </Form>
  </Modal>
 );
}
