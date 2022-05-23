import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { useAppDispatch } from "app/store";
import { IProduct } from "constants/models/product.model";
import { AddSubCategoryPayload } from "constants/payload/category.payload";
import {
 createSubCategoryAction,
 deleteNsxAction,
} from "features/category/category.action";
import { getProductNsxAction } from "features/product/product.action";
import { useCategory } from "hook/useCategory";
import { useLoading } from "hook/useLoading";
import { createContext, useContext, useState } from "react";
import { useParams } from "react-router-dom";
interface INSX {
 getProduct: any;
 product: IProduct[];
}
const NsxContext = createContext<INSX>({} as INSX);
export const useNsx = () => useContext(NsxContext);

export default function NsxProvider({ children }: any) {
 const dispatch = useAppDispatch();
 const loading = useLoading();
 const [product, setProduct] = useState<IProduct[] | []>([]);

 const getProduct = (path: string) => {
  loading?.show();
  dispatch(getProductNsxAction(path))
   .then(unwrapResult)
   .then((res: any) => {
    setProduct(res?.data);
   })
   .finally(() => loading?.hide());
 };

 return (
  <NsxContext.Provider
   value={{
    getProduct,
    product,
   }}>
   {children}
  </NsxContext.Provider>
 );
}
