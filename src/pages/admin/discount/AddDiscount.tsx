import {
 Checkbox,
 Col,
 DatePicker,
 Form,
 Input,
 InputNumber,
 Modal,
 Row,
 Tabs,
} from "antd";
import { useAppSelector } from "app/store";
import { ICategory } from "constants/models/category.model";
import { IProduct } from "constants/models/product.model";
import React, { useEffect } from "react";
import _filter from "lodash/filter";
import { createRule } from "pages/client/cart/Payment";
import { useProduct } from "hook/useProduct";
import { useDiscount } from "pages/admin/discount/useDiscount";
type Props = {
 visible: boolean;
 hide: () => void;
};
export default function AddDiscount({ hide, visible }: Props) {
 const { TabPane } = Tabs;
 const { categories } = useAppSelector().category;
 const { fetchProduct, products } = useProduct();
 const { addDiscount } = useDiscount();
 useEffect(() => {
  fetchProduct();
 }, []);
 const [form] = Form.useForm();

 const onFinish = (values: any) => {
  addDiscount(values);
 };

 return (
  <Modal
   visible={visible}
   onCancel={() => hide()}
   onOk={() => form.submit()}
   title="Thêm khuyến mãi">
   <Form form={form} labelCol={{ span: 6 }} onFinish={onFinish}>
    <Form.Item
     name="name"
     label="Tên khuyến mãi"
     rules={[{ ...createRule("name") }]}>
     <Input />
    </Form.Item>
    <Form.Item
     name="startDate"
     label="Ngày bắt đầu"
     rules={[{ ...createRule("startDate") }]}>
     <DatePicker />
    </Form.Item>
    <Form.Item
     name="endDate"
     label="Ngày kết thúc"
     rules={[{ ...createRule("endDate") }]}>
     <DatePicker />
    </Form.Item>
    <Form.Item
     name="percent"
     label="Tỷ lệ giảm giá"
     rules={[{ ...createRule("percent") }]}>
     <InputNumber addonAfter="%" />
    </Form.Item>
    <Form.Item name={"list"} rules={[{ ...createRule("list") }]}>
     <Checkbox.Group>
      <Tabs>
       {categories.map((it: ICategory, idx: number) => (
        <TabPane tab={it.name} key={idx}>
         <Row>
          {_filter(products, (n) => n.category._id === it._id).map(
           (prod: IProduct) => (
            <Col span={24}>
             <Checkbox value={prod._id}>{prod.name}</Checkbox>
            </Col>
           )
          )}
         </Row>
        </TabPane>
       ))}
      </Tabs>
     </Checkbox.Group>
    </Form.Item>
   </Form>
  </Modal>
 );
}
