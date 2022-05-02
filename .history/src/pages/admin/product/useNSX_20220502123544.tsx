import { unwrapResult } from "@reduxjs/toolkit";
import { RootState, useAppDispatch } from "app/store";
import { AddSubCategoryPayload } from "constants/payload/category.payload";
import {
 createCategoryAction,
 createSubCategoryAction,
} from "features/category/category.action";
import { useLoading } from "hook/useLoading";
import React from "react";
import { useSelector } from "react-redux";

export default function useNSX() {
 const categories = useSelector(
  (state: RootState) => state.category.categories
 );
 const dispatch = useAppDispatch();
 const loading = useLoading();
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
    console.log(res);
   })
   .finally(() => loading?.hide());
 };
 return { categories, deleteNSX, addSubcategory, addCategory };
}