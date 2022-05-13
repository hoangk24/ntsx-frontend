import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "app/store";
import { IComment } from "constants/models/comment.model";
import { IImage } from "constants/models/common.model";
import { IProduct } from "constants/models/product.model";
import { getProductDetailAction } from "features/product/product.action";
import { useLoading } from "hook/useLoading";
import {
 createContext,
 useContext,
 useEffect,
 useState,
} from "react";
import { useParams } from "react-router-dom";
interface IProductDetailContext {
 fetchDetail: any;
 comment: IComment[];
 posters: IImage[];
 detail: IProduct;
}
const ProductDetailContext = createContext<IProductDetailContext>(
 {} as IProductDetailContext
);
export const useProductDetail = () =>
 useContext(ProductDetailContext);
export default function ProductDetailProvider({ children }: any) {
 const { id } = useParams();
 const loading = useLoading();
 const dispatch = useAppDispatch();
 const [comment, setComment] = useState([]);
 const [posters, setPosters] = useState([]);
 const [detail, setDetail] = useState<IProduct>({} as IProduct);
 const fetchDetail = () => {
  loading?.show();
  dispatch(getProductDetailAction(id as string))
   .then(unwrapResult)
   .then((res: any) => {
    console.log(res);

    setDetail(res?.data.product);
    setPosters(res?.data.product.posters);
    setComment(res?.data?.comments);
   })
   .finally(() => loading?.hide());
 };
 useEffect(() => {
  fetchDetail();
 }, [id]);
 return (
  <ProductDetailContext.Provider
   value={{
    fetchDetail,
    comment,
    posters,
    detail,
   }}>
   {children}
  </ProductDetailContext.Provider>
 );
}
