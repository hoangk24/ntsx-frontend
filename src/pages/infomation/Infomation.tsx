import { Modal } from "antd";
import React from "react";
type Props = {
 visible: boolean;
 onHide: () => void;
};
export default function Infomation({ onHide, visible }: Props) {
 return (
  <Modal visible={visible} onCancel={onHide}>
   <h1>INFORMATION USER</h1>
  </Modal>
 );
}
