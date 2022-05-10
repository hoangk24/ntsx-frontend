import React, {
 createContext,
 useContext,
 useEffect,
 useState,
} from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../app/store";
import { getProductCategoryAction } from "../features/product/product.action";
import { unwrapResult } from "@reduxjs/toolkit";
import { IProduct } from "../constants/models/product.model";
import { useLoading } from "./useLoading";
import {
 createCategoryAction,
 getCategoryAction,
 updatgeCategoryAction,
} from "features/category/category.action";
import { ICategory } from "constants/models/category.model";
import { setCategory } from "features/category/categorySlice";
import { message } from "antd";
import useEffectSkipFisrtRender from "hook/useEffectSkipFisrtRender";
interface ICategoryContext {
 getProduct: any;
 product: any;
 fetchCategory: any;
 addCategory: any;
 updateCategory: any;
}
const CategoryContext = createContext<ICategoryContext>(
 {} as ICategoryContext
);
export const useCategory = () => useContext(CategoryContext);

export default function CategoryProvider({ children }: any) {
 const [product, setProduct] = useState<IProduct[] | []>([]);
 const dispatch = useAppDispatch();
 const loading = useLoading();
 const getProduct = (path: string) => {
  loading?.show();
  dispatch(getProductCategoryAction(path))
   .then(unwrapResult)
   .then((res: any) => {
    setProduct(res?.data);
   })
   .finally(() => loading?.hide());
 };
 const addCategory = (data: any) => {
  loading?.show();
  dispatch(createCategoryAction(data))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res?.message);
   })
   .finally(() => loading?.hide());
 };
 const updateCategory = (id: string, data?: any, file?: any) => {
  loading?.show();
  let formData = new FormData();
  if (file) {
   formData.append("logos", file);
  }
  if (data) {
   for (const [key, value] of Object.entries(data)) {
    formData.append(key, value as any);
   }
  }
  dispatch(updatgeCategoryAction({ id, update: formData }))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res.message);
   })
   .catch((err: any) => message.error(err.message))
   .finally(() => loading?.hide());
 };

 const fetchCategory = () => {
  loading?.show();
  dispatch(getCategoryAction({}))
   .then(unwrapResult)
   .then((res: any) => dispatch(setCategory(res.data)))
   .finally(() => loading?.hide());
 };
 useEffect(() => {
  fetchCategory();
 }, []);

 //  useEffect(() => {
 //   console.log("render");
 //   getProduct();
 //  }, [path]);

 return (
  <CategoryContext.Provider
   value={{
    getProduct,
    product,
    fetchCategory,
    addCategory,
    updateCategory,
   }}>
   {children}
  </CategoryContext.Provider>
 );
}
