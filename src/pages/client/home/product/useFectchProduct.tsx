import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "app/store";
import { IProduct } from "constants/models/product.model";
import { getProductAction } from "features/product/product.action";
import React, { useEffect, useState } from "react";

export default function useFectchProduct() {
 const [products, setProducts] = useState<IProduct[] | []>([]);

 const dispatch = useAppDispatch();
 const fetchProduct = () => {
  dispatch(getProductAction({}))
   .then(unwrapResult)
   .then((res: any) => {
    setProducts(res?.data);
   });
 };

 useEffect(() => {
  fetchProduct();
 }, []);

 return { products };
}
