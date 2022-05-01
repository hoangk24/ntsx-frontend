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
import { formatDate } from "utils/common";

type Props = {
 visible: boolean;
 hide: () => void;
};
export default function AddVoucher({ hide, visible }: Props) {
 const { RangePicker } = DatePicker;
 const [form] = Form.useForm();
 const { createVoucher } = useVoucher();
 const onFinish = (values: any) => {
  const { expired, percent, voucher } = values;
  const data: any = {
   voucher,
   percent,
   startDate: moment(expired[0]),
   endDate: moment(expired[1]),
  };
  createVoucher(data);
 };

 return (
  <Modal
   onOk={() => form.submit()}
   title="Thêm Voucher"
   visible={visible}
   onCancel={() => hide()}>
   <Form form={form} onFinish={onFinish} labelCol={{ span: 6 }}>
    <Form.Item
     name={"voucher"}
     label="Mã voucher"
     rules={[{ ...createRule("voucher") }]}>
     <Input />
    </Form.Item>
    <Form.Item
     name="percent"
     label="Tỷ lệ"
     rules={[{ ...createRule("percent") }]}>
     <InputNumber addonAfter="%" />
    </Form.Item>
    <Form.Item
     name="expired"
     label="Thời hạn"
     rules={[{ ...createRule("expired") }]}>
     <RangePicker />
    </Form.Item>
    <Form.Item label="Tự động bắt đầu">
     <Switch />
    </Form.Item>
   </Form>
  </Modal>
 );
}
