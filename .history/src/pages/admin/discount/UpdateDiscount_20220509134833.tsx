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
import useLogicProduct from "pages/admin/product/product/useLogicProduct";
import React, { useEffect, useState } from "react";
import _filter from "lodash/filter";
import { createRule } from "pages/client/cart/Payment";
import useDiscount from "pages/admin/discount/useDiscount";
import moment from "moment";
import { IDiscount } from "constants/models/discount.model";
import _reduce from "lodash/reduce";
type Props = {
 visible: boolean;
 hide: () => void;
 data?: IDiscount;
};
export default function UpdateDiscount({
 hide,
 visible,
 data,
}: Props) {
 const { TabPane } = Tabs;
 const { categories } = useAppSelector().category;
 //  const { fetchProduct, products } = useLogicProduct();
 const {
  defaultCheckedList,
  onChangeCheckList,
  setCheckedList,
  updateDiscountFn,
 } = useDiscount();

 const [form] = Form.useForm();

 useEffect(() => {
  // fetchProduct();
  setCheckedList(data?.list || []);
 }, [data]);

 const onFinish = (values: any) => {
  const { endDate, name, percent, startDate } = values;
  const x = {
   endDate: endDate || data?.endDate,
   name: name || data?.name,
   percent: percent || data?.percent,
   startDate: startDate || data?.startDate,
   list: defaultCheckedList,
  };
  updateDiscountFn(data?._id as string, x);
 };

 return (
  <Modal
   visible={visible}
   onCancel={() => {
    form.resetFields();
    hide();
   }}
   onOk={() => form.submit()}
   title="Chỉnh sửa khuyến mãi">
   <Form form={form} labelCol={{ span: 6 }} onFinish={onFinish}>
    <Form.Item
     name="name"
     label="Tên khuyến mãi"
     //  rules={[{ ...createRule("name") }]}
    >
     <Input defaultValue={data?.name} />
    </Form.Item>
    <Form.Item
     name="startDate"
     label="Ngày bắt đầu"
     //  rules={[{ ...createRule("startDate") }]}
    >
     <DatePicker defaultValue={moment(data?.startDate)} />
    </Form.Item>
    <Form.Item
     name="endDate"
     label="Ngày kết thúc"
     //  rules={[{ ...createRule("endDate") }]}
    >
     <DatePicker defaultValue={moment(data?.endDate)} />
    </Form.Item>
    <Form.Item
     name="percent"
     label="Tỷ lệ giảm giá"
     //  rules={[{ ...createRule("percent") }]}
    >
     <InputNumber addonAfter="%" defaultValue={data?.percent} />
    </Form.Item>
    <Form.Item>
     <Tabs>
      {categories.map((it: ICategory, idx: number) => (
       <TabPane tab={it.name} key={idx}>
        {/* <Row>
         {_filter(products, (n) => n.category._id === it._id).map(
          (prod: IProduct) => (
           <Col key={Math.random()} span={24}>
            <Checkbox
             onChange={(e) => {
              onChangeCheckList(prod._id, e.target.checked);
             }}
             checked={defaultCheckedList.includes(prod._id)}
             value={prod._id}>
             {prod.name}
            </Checkbox>
           </Col>
          )
         )}
        </Row> */}
       </TabPane>
      ))}
     </Tabs>
    </Form.Item>
   </Form>
  </Modal>
 );
}
