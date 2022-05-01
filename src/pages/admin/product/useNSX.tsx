import { RootState } from "app/store";
import { AddSubCategoryPayload } from "constants/payload/category.payload";
import { useLoading } from "hook/useLoading";
import React from "react";
import { useSelector } from "react-redux";

export default function useNSX() {
 const categories = useSelector(
  (state: RootState) => state.category.categories
 );
 const loading = useLoading();
 const deleteNSX = (id: string) => {
  loading?.show();
  setTimeout(() => {
   console.log(id);
   loading?.hide();
  }, 1000);
 };
 const addSubcategory = ({
  category,
  name,
  path,
 }: AddSubCategoryPayload) => {
  loading?.show();
  setTimeout(() => {
   console.log(category);
   loading?.hide();
  }, 1000);
 };
 return { categories, deleteNSX, addSubcategory };
}
