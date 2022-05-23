import { InputNumber } from "antd";
import { IProduct } from "constants/models/product.model";
import { useProduct } from "hook/useProduct";
import React, { useCallback, useState } from "react";
import _debounce from "lodash/debounce";
import useEffectSkipFisrtRender from "hook/useEffectSkipFisrtRender";

interface Props {
 data: number;
 max?: number;
 addonAfter: string;
 fn: any;
}
export default function InputNumberWait({
 data,
 max,
 addonAfter,
 fn,
}: Props) {
 const [value, setValue] = useState(data || 0);

 const onUpdate = useCallback(
  _debounce(() => update(), 500),
  [value]
 );
 const update = () => {
  fn(value);
 };
 useEffectSkipFisrtRender(() => {
  onUpdate();
  return onUpdate.cancel;
 }, [value, onUpdate]);

 return (
  <InputNumber
   onChange={(value: number) => {
    setValue(value);
   }}
   min={1}
   max={max}
   defaultValue={value}
   addonAfter={addonAfter}
  />
 );
}
