import { PayPalButtons } from "@paypal/react-paypal-js";
import { Button, Form, Input, Result, Select, Tabs } from "antd";
import { useAppSelector } from "app/store";
import {
 ICity,
 IDistrict,
 IWard,
} from "constants/models/province.mode";
import { useCart } from "hook/useCart";
import useProvince from "hook/useProvince";
import React, { useCallback, useEffect } from "react";
export const createRule = (name: string) => ({
 required: true,
 message: `${name} không được để trống!`,
});
export default function Payment() {
 const { preview, carts } = useAppSelector().cart;

 const {
  city,
  district,
  onChangeCity,
  onChangeDistrict,
  ward,
  fetchCity,
 } = useProvince();
 const [form] = Form.useForm();
 const { Option } = Select;
 const { paidWithPaypal, getPreviewCart, paidWithoutPaypal } =
  useCart();
 const { TabPane } = Tabs;
 const { user } = useAppSelector().auth;
 const onFinish = useCallback(() => {
  form.validateFields().then((value: any) => {
   const data = {
    address: value.city + value.district + value.ward + value.living,
    fullName: value.fullName,
    phoneNumber: value.phoneNumber,
   };
   paidWithoutPaypal(data);
  });
 }, [form]);

 useEffect(() => {
  fetchCity();
 }, []);

 if (preview?.isDisabled)
  return (
   <Result
    status={"403"}
    title="Rất xin lỗi quý khách đã có mặt hàng không đủ số lượng!"
    subTitle="Hãy xoá mặt hàng không đủ số lượng khỏi giỏ hàng để thanh toán"
   />
  );

 return (
  <div>
   <Tabs type="card">
    <TabPane tab=" Thanh toán Online" key="1">
     <PayPalButtons
      createOrder={(data, actions) => {
       return actions.order.create({
        purchase_units: [
         {
          amount: {
           value: `${(preview?.finalCost * 0.000043).toFixed(2)}`,
          },
         },
        ],
       });
      }}
      onApprove={(data, actions: any) => {
       return actions.order.capture().then((details: any) => {
        console.log(
         "🚀 ~ file: Payment.tsx ~ line 75 ~ returnactions.order.capture ~ details",
         details.purchase_units
        );


        paidWithPaypal(details.payer);
       });
      }}
     />
    </TabPane>
    <TabPane tab="Thanh toán khi nhận hàng" key="2">
     <Form
      form={form}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 17 }}>
      <Form.Item
       label="Tên người nhận"
       name="fullName"
       rules={[createRule("fullName")]}>
       <Input />
      </Form.Item>
      <Form.Item
       label="Số điện thoại"
       name="phoneNumber"
       rules={[createRule("phoneNumber")]}>
       <Input />
      </Form.Item>
      <Form.Item
       label="Tỉnh"
       name="city"
       rules={[createRule("city")]}>
       <Select
        loading={!city.length}
        disabled={!city.length}
        onChange={onChangeCity}>
        {city?.map((it: ICity) => {
         return (
          <Option key={Math.random()} value={it.province_id}>
           {it.province_name}
          </Option>
         );
        })}
       </Select>
      </Form.Item>
      <Form.Item
       label="Huyện"
       name="district"
       rules={[createRule("district")]}>
       <Select
        disabled={!district.length}
        onChange={onChangeDistrict}>
        {district?.map((it: IDistrict) => {
         return (
          <Option key={Math.random()} value={it.district_id}>
           {it.district_name}
          </Option>
         );
        })}
       </Select>
      </Form.Item>
      <Form.Item label="Xã" name="ward" rules={[createRule("ward")]}>
       <Select disabled={!ward.length}>
        {ward?.map((it: IWard) => {
         return (
          <Option key={Math.random()} value={it.ward_id}>
           {it.ward_name}
          </Option>
         );
        })}
       </Select>
      </Form.Item>
      <Form.Item
       label="Địa chỉ cụ thể"
       name="living"
       rules={[createRule("living")]}>
       <Input />
      </Form.Item>
      <Form.Item label="Thanh toán">
       <Button onClick={() => onFinish()}>Đặt hàng</Button>
       <Button>Lưu thành đơn hàng riêng</Button>
      </Form.Item>
     </Form>
    </TabPane>
   </Tabs>
  </div>
 );
}
