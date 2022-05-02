import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { useAppDispatch } from "app/store";
import { IProduct } from "constants/models/product.model";
import {
 addProductAction,
 deleteProductAction,
 getProductAction,
} from "features/product/product.action";
import { useLoading } from "hook/useLoading";
import { useState } from "react";

export default function useLogicProduct() {
 const [products, setProducts] = useState<IProduct[] | []>([]);

 const dispatch = useAppDispatch();
 const loading = useLoading();
 const fetchProduct = async () => {
  loading?.show();
  dispatch(getProductAction({}))
   .then(unwrapResult)
   .then((res: any) => {
    setProducts(res.data);
   })
   .catch((err: any) => message.error(err.message))
   .finally(() => loading?.hide());
 };
 const addProduct = (formData: any) => {
  loading?.show();
  dispatch(addProductAction(formData))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res.message);
    console.log(res);
   })
   .catch((err: any) => {
    message.error(err.message);
   })
   .finally(() => loading?.hide());
 };

 //!delete product
 const deleteProduct = (id: string) => {
  loading?.show();
  dispatch(deleteProductAction({ id }))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res.message);
    fetchProduct();
   })
   .catch((err: any) => message.error(err?.message))
   .finally(() => loading?.hide());
 };

 return {
  fetchProduct,
  addProduct,
  products,
  deleteProduct,
 };
}
