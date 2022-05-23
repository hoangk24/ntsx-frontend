import { Form, Input, InputNumber, Modal, Slider } from "antd";
import ModalFormWrapper from "components/modal/ModalFormWrapper";
import { useResetFormOnCloseModal } from "hook/useResetFormModal";
import { createRule } from "pages/client/cart/Payment";
interface ModalFormProps {
 visible: boolean;
 onCancel: () => void;
}

const SizeForm: React.FC<ModalFormProps> = ({
 visible,
 onCancel,
}) => {
 const [form] = Form.useForm();

 const onOk = () => {
  form.submit();
 };

 return (
  <ModalFormWrapper
   form={form}
   onHide={onCancel}
   onSubmit={onOk}
   visible={visible}>
   <Form form={form} layout="vertical" name="sizeForm">
    <Form.Item
     name="size"
     label="Size"
     rules={[{ ...createRule("Size") }]}>
     <Input />
    </Form.Item>
    <Form.Item
     label={"Số lượng"}
     name="quantity"
     rules={[{ ...createRule("Số lượng") }]}>
     <InputNumber min={1} />
    </Form.Item>
   </Form>
  </ModalFormWrapper>
 );
};

export default SizeForm;
