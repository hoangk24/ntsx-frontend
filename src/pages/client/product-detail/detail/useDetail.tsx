import { ISizes } from "constants/models/product.model";
import React, { useEffect, useState } from "react";
import _findIndex from "lodash/findIndex";
import { RadioChangeEvent } from "antd";
export default function useDetail(size: ISizes[]) {
 const [maxQuantity, setMaxQuantity] = useState(0);

 const onChangeSize = (e: RadioChangeEvent) => {
  const idx = _findIndex(
   size,
   (n: ISizes) => n.size === (e.target as any).value
  );
  setMaxQuantity(size[idx].quantity);
 };

 useEffect(() => {
  setMaxQuantity(size?.[0]?.quantity);
 }, [size]);

 return {
  maxQuantity,
  onChangeSize,
 };
}
