import { RootState } from "app/store";
import { ICategory } from "constants/models/category.model";
import React, { useMemo } from "react";
import logoExample from "./logoExample.png";
import { useSelector } from "react-redux";
import "./Category.scss";
import CategoryLoading from "pages/client/home/category/CategoryLoading";
import { useNavigate } from "react-router-dom";

export default function HomeCategory() {
 const categories = useSelector(
  (state: RootState) => state.category.categories
 );
 const navigate = useNavigate();

 const mapCatgegories = useMemo(() => {
  if (!categories)
   return (
    <div className="d-flex">
     <CategoryLoading />
     <CategoryLoading />
     <CategoryLoading />
     <CategoryLoading />
    </div>
   );
  else
   return categories?.map((it: ICategory) => (
    <div
     className=""
     key={Math.random()}
     onClick={() => navigate(`/product/category/${it.path}`)}>
     <div className="content">
      <img src={it.logos.url} alt="" />
      <div className="">
       <h3>{it.name}</h3>
       <span>Best choice</span>
      </div>
     </div>
    </div>
   ));
 }, [categories]);

 return (
  <div className="home-category">
   <h1 className="home-category-title">Danh mục sản phẩm</h1>
   <div className="category">{mapCatgegories}</div>
  </div>
 );
}
