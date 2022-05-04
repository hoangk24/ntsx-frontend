import { FormInstance, Modal } from "antd";
import { useResetFormOnCloseModal } from "hook/useResetFormModal";
import React from "react";
type Props = {
 visible: boolean;
 onHide: () => void;
 children: React.ReactNode;
 onSubmit: () => void;
 form: FormInstance;
 okeText?: string;
 cancleText?: string;
};
ModalFormWrapper.defaultProps = {
 visible: false,
};
export default function ModalFormWrapper({
 visible,
 children,
 onHide,
 onSubmit,
 okeText,
 cancleText,
 form,
}: Props) {
 useResetFormOnCloseModal({ form, visible });
 return (
  <Modal
   okText={okeText}
   cancelText={cancleText}
   visible={visible}
   onOk={onSubmit}
   onCancel={onHide}>
   {children}
  </Modal>
 );
}
