import {
 DatePicker,
 Form,
 Input,
 InputNumber,
 Modal,
 Switch,
} from "antd";
import { IVoucher } from "constants/models/voucher.model";
import useVoucher from "hook/useVoucher";
import moment from "moment";
import { createRule } from "pages/client/cart/Payment";
import React from "react";

type Props = {
 visible: boolean;
 hide: () => void;
 update: IVoucher;
};
export default function UpdateVoucher({
 hide,
 visible,
 update,
}: Props) {
 const { RangePicker } = DatePicker;
 const [form] = Form.useForm();
 const { createVoucher } = useVoucher();

 const onFinish = (values: any) => {
  // const { expired, percent, voucher } = values;
  // const data: any = {
  //  voucher,
  //  percent,
  //  startDate: moment(expired[0]),
  //  endDate: moment(expired[1]),
  // };
  // createVoucher(data);
 };

 return (
  <Modal
   onCancel={() => {
    form.resetFields();
    hide();
   }}
   onOk={() => form.submit()}
   visible={visible}>
   <Form form={form} onFinish={onFinish} labelCol={{ span: 6 }}>
    <Form.Item
     name={"voucher"}
     label="Mã voucher"
     rules={[{ ...createRule("voucher") }]}>
     <Input defaultValue={update?.voucher} />
    </Form.Item>
    <Form.Item
     name="percent"
     label="Tỷ lệ"
     rules={[{ ...createRule("percent") }]}>
     <InputNumber addonAfter="%" defaultValue={update?.percent} />
    </Form.Item>
    <Form.Item
     name="expired"
     label="Thời hạn"
     rules={[{ ...createRule("expired") }]}>
     <RangePicker
      defaultValue={[
       moment(update?.startDate),
       moment(update?.endDate),
      ]}
     />
    </Form.Item>
    <Form.Item label="Tự động bắt đầu">
     <Switch />
    </Form.Item>
   </Form>
  </Modal>
 );
}
