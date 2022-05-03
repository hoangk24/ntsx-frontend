import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "app/store";
import { ICategory } from "constants/models/category.model";
import { getCategoryAction } from "features/category/category.action";
import { setCategory } from "features/category/categorySlice";
import useCart from "hook/useCart";

import React, { useEffect } from "react";

export default function useLoadRequired() {
 const { carts } = useAppSelector().cart;
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
