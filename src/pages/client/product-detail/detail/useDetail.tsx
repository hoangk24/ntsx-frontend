import { ISizes } from "constants/models/product.model";
import React, { useEffect, useState } from "react";
import _findIndex from "lodash/findIndex";
import { RadioChangeEvent } from "antd";
export default function useDetail(size: ISizes[]) {
 const [maxQuantity, setMaxQuantity] = useState(0);
 const [sizeChoice, setSizeChoice] = useState<number | null>(null);
 const [quantityChoice, setQuantityChoice] = useState<number>(1);
 const onChangeQuantity = (value: number) => {
  setQuantityChoice(value);
 };
 const onChangeSize = (e: RadioChangeEvent) => {
  const idx = _findIndex(
   size,
   (n: ISizes) => n.size === (e.target as any).value
  );
  setSizeChoice(size?.[idx]?.size as any);
  setQuantityChoice(1);
  setMaxQuantity(size[idx].quantity);
 };

 useEffect(() => {
  setMaxQuantity(size?.[0]?.quantity);
  setSizeChoice(size?.[0] as any);
 }, []);

 return {
  maxQuantity,
  onChangeSize,
  sizeChoice,
  quantityChoice,
  onChangeQuantity,
 };
}
