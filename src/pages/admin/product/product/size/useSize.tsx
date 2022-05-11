import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { ISizes } from "constants/models/product.model";
import _cloneDeep from "lodash/cloneDeep";
import _findIndex from "lodash/findIndex";
import _filter from "lodash/filter";
import React, { useState } from "react";
export default function useSize() {
 const [list, setList] = useState<ISizes[]>([] as ISizes[]);
 const [reload, setReload] = useState(false);
 const updateSizeObject = (data: Partial<ISizes>) => {
  const copy = _cloneDeep(list);
  const idx = _findIndex(copy, (n: ISizes) => n._id === data._id);
  copy[idx].size = data?.size || list[idx].size;
  copy[idx].quantity = data?.quantity || list[idx].quantity;
  setList(copy);
  setReload(!reload);
 };

 const removeSize = (id: string) => {
  let copy = _cloneDeep(list);
  setList(_filter(copy, (n: ISizes) => n._id !== id));
 };

 const addSize = (data: ISizes) => {
  let copy = _cloneDeep(list);
  const idx = _findIndex(copy, (n: ISizes) => n.size === data.size);
  if (idx !== -1) {
   Modal.confirm({
    title: "Size này đã tồn tại",
    icon: <ExclamationCircleOutlined />,
    content: "Bạn có muốn cộng số lượng mới vào size cũ không!",
    okText: "Nhập",
    cancelText: "Huỷ",
    onOk: () => {
     copy[idx].quantity += data.quantity;
     setList(copy);
     setReload(!reload);
    },
   });
  } else {
   copy.push(data);
   setList(copy);
   setReload(!reload);
  }
 };

 return {
  updateSizeObject,
  addSize,
  setList,
  list,
  reload,
  removeSize,
 };
}
