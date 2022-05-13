import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { useAppDispatch } from "app/store";
import { IProduct } from "constants/models/product.model";
import {
 addProductAction,
 deleteProductAction,
 getProductAction,
 updateProductAction,
} from "features/product/product.action";
import { useLoading } from "hook/useLoading";
import React, {
 createContext,
 useContext,
 useEffect,
 useState,
} from "react";

interface IProductContext {
 fetchProduct: () => void;
 deleteProduct: (id: string) => void;
 addProduct: (formData: any) => void;
 products: IProduct[];
 updateProduct: (id: string, data: Partial<IProduct>) => Promise<any>;
}
export const ProductContext = createContext<IProductContext>(
 {} as IProductContext
);
export const useProduct = () => useContext(ProductContext);

export default function ProductProvider({ children }: any) {
 const [products, setProducts] = useState<IProduct[] | []>([]);

 const dispatch = useAppDispatch();
 const loading = useLoading();

 const updateProduct = async (
  id: string,
  data: Partial<IProduct>
 ) => {
  loading?.show();
  return dispatch(updateProductAction({ id, data }))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res.message);
    fetchProduct();
   })
   .catch((err: any) => {
    loading?.hide();
    message.error(err.message);
   })
   .finally(() => loading?.hide());
 };
 const fetchProduct = async () => {
  loading?.show();
  dispatch(getProductAction({}))
   .then(unwrapResult)
   .then((res: any) => {
    setProducts(res.data);
   })
   .catch((err: any) => {
    loading?.hide();
    message.error(err.message);
   })
   .finally(() => loading?.hide());
 };

 const addProduct = (formData: any) => {
  loading?.show();
  dispatch(addProductAction(formData))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res.message);
   })
   .catch((err: any) => {
    loading?.hide();
    message.error(err.message);
   })
   .finally(() => loading?.hide());
 };

 const deleteProduct = (id: string) => {
  loading?.show();
  dispatch(deleteProductAction({ id }))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res.message);
    fetchProduct();
   })
   .catch((err: any) => {
    loading?.hide();
    message.error(err?.message);
   })
   .finally(() => loading?.hide());
 };

 useEffect(() => {
  fetchProduct();
 }, []);

 return (
  <ProductContext.Provider
   value={{
    fetchProduct,
    deleteProduct,
    addProduct,
    products,
    updateProduct,
   }}>
   {children}
  </ProductContext.Provider>
 );
}
