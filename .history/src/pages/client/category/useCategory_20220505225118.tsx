import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../app/store";
import { getProductCategoryAction } from "../../../features/product/product.action";
import { unwrapResult } from "@reduxjs/toolkit";
import { IProduct } from "../../../constants/models/product.model";
import { useLoading } from "../../../hook/useLoading";
import { getCategoryAction } from "features/category/category.action";
import { ICategory } from "constants/models/category.model";
import { setCategory } from "features/category/categorySlice";

function useCategory() {
 const [product, setProduct] = useState<IProduct[] | []>([]);
 const { path } = useParams();
 const dispatch = useAppDispatch();
 const loading = useLoading();
 const getProduct = () => {
  loading?.show();
  dispatch(getProductCategoryAction(path as string))
   .then(unwrapResult)
   .then((res: any) => {
    setProduct(res?.data);
   })
   .finally(() => loading?.hide());
 };
 const fetchCategory = () => {
  loading?.show();
  dispatch(getCategoryAction({}))
   .then(unwrapResult)
   .then((res: any) => dispatch(setCategory(res.data)));
 };
 return { getProduct, product, path, fetchCategory };
}

export default useCategory;
