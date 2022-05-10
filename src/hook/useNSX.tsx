import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { useAppDispatch } from "app/store";
import { IProduct } from "constants/models/product.model";
import { AddSubCategoryPayload } from "constants/payload/category.payload";
import { createSubCategoryAction } from "features/category/category.action";
import { getProductNsxAction } from "features/product/product.action";
import { useLoading } from "hook/useLoading";
import { createContext, useContext, useState } from "react";
import { useParams } from "react-router-dom";
interface INSX {
 addSubcategory: (data: AddSubCategoryPayload, setOpen: any) => void;
 deleteNSX: (id: string) => void;
 getProduct: any;
 product: IProduct[];
}
const NsxContext = createContext<INSX>({} as INSX);
export const useNsx = () => useContext(NsxContext);

export default function NsxProvider({ children }: any) {
 const dispatch = useAppDispatch();
 const loading = useLoading();
 const [product, setProduct] = useState<IProduct[] | []>([]);

 const deleteNSX = (id: string) => {
  loading?.show();
  setTimeout(() => {
   console.log(id);
   loading?.hide();
  }, 1000);
 };
 const getProduct = (path: string) => {
  loading?.show();
  dispatch(getProductNsxAction(path))
   .then(unwrapResult)
   .then((res: any) => {
    setProduct(res?.data);
    console.log(res);
   })
   .finally(() => loading?.hide());
 };
 const addSubcategory = (
  data: AddSubCategoryPayload,
  setOpen: any
 ) => {
  loading?.show();
  dispatch(createSubCategoryAction(data))
   .then(unwrapResult)
   .then((res: any) => {
    setOpen();
    message.success(res?.message);
   })
   .finally(() => loading?.hide());
 };

 return (
  <NsxContext.Provider
   value={{
    addSubcategory,
    deleteNSX,
    getProduct,
    product,
   }}>
   {children}
  </NsxContext.Provider>
 );
}
