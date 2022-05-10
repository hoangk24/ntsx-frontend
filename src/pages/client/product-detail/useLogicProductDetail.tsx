import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "app/store";
import { IProduct } from "constants/models/product.model";
import { getProductDetailAction } from "features/product/product.action";
import { useLoading } from "hook/useLoading";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function useLogicProductDetail() {
 const { id } = useParams();
 const loading = useLoading();
 const dispatch = useAppDispatch();
 const [comment, setComment] = useState([]);
 const [posters, setPosters] = useState([]);
 const [detail, setDetail] = useState<IProduct>();
 const [description, setDescription] = useState("");
 const [suggestProducts, setSuggestProducts] = useState([]);
 const fetchDetail = () => {
  loading?.show();
  dispatch(getProductDetailAction(id as string))
   .then(unwrapResult)
   .then((res: any) => {
    setDetail(res?.data);
    setPosters(res?.data.posters);
    setDescription(res?.data?.note);
   })
   .finally(() => loading?.hide());
 };

 return {
  id,
  fetchDetail,
  comment,
  posters,
  suggestProducts,
  detail,
  description,
 };
}
