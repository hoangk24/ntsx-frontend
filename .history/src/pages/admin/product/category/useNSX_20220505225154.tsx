import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { RootState, useAppDispatch } from "app/store";
import { AddSubCategoryPayload } from "constants/payload/category.payload";
import {
 createCategoryAction,
 createSubCategoryAction,
 updatgeCategoryAction,
} from "features/category/category.action";
import { useLoading } from "hook/useLoading";
import useCategory from "pages/client/category/useCategory";
import React from "react";
import { useSelector } from "react-redux";

export default function useNSX() {
 const categories = useSelector(
  (state: RootState) => state.category.categories
 );
 const dispatch = useAppDispatch();
 const loading = useLoading();
 const { fetchCategory } = useCategory();
 const deleteNSX = (id: string) => {
  loading?.show();
  setTimeout(() => {
   console.log(id);
   loading?.hide();
  }, 1000);
 };
 const addCategory = (data: any) => {
  loading?.show();
  dispatch(createCategoryAction(data))
   .then(unwrapResult)
   .then((res: any) => {
    console.log(res);
   })
   .finally(() => loading?.hide());
 };
 const addSubcategory = (data: AddSubCategoryPayload) => {
  loading?.show();
  dispatch(createSubCategoryAction(data))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res.message);
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
    fetchCategory;
    message.success(res.message);
   })
   .catch((err: any) => message.error(err.message))
   .finally(() => loading?.hide());
 };
 return {
  categories,
  deleteNSX,
  addSubcategory,
  addCategory,
  updateCategory,
 };
}
