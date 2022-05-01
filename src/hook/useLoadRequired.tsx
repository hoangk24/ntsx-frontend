import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "app/store";
import { ICategory } from "constants/models/category.model";
import { getCategoryAction } from "features/category/category.action";
import { setCategory } from "features/category/categorySlice";

import React, { useEffect } from "react";

export default function useLoadRequired() {
 const dispatch = useAppDispatch();
 const fetchCategory = () => {
  dispatch(getCategoryAction({}))
   .then(unwrapResult)
   .then((res: any) => fetchCategorySuccess(res.data));
 };
 const fetchCategorySuccess = (res: ICategory[]) => {
  dispatch(setCategory(res));
 };

 useEffect(() => {
  fetchCategory();
 }, []);
}
