import { Input, Modal, Row } from "antd";
import useSearch from "components/search/useSearch";
import { IProduct } from "constants/models/product.model";
import useEffectSkipFisrtRender from "hook/useEffectSkipFisrtRender";
import React, { useEffect, useState } from "react";
import "./Search.scss";
interface Props {
 visible: boolean;
 onHide: () => void;
}
export default function Search(props: Props) {
 const { onHide, visible } = props;
 const { setText, mapProduct, setProduct } = useSearch(onHide);

 useEffectSkipFisrtRender(() => {
  if (!visible) {
   setText("");
   setProduct([]);
  }
 }, [visible]);

 return (
  <Modal
   className="search"
   title="Tìm kiếm"
   footer={false}
   width="50%"
   visible={visible}
   onCancel={() => onHide()}>
   <Input.Search
    size="large"
    placeholder="Nhập vào đây để tìm kiếm sản phẩm"
    onChange={(e) => setText(e.target.value)}
   />
   <div className="search-list">{mapProduct}</div>
  </Modal>
 );
}
