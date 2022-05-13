import Comment from "pages/client/product-detail/comment/Comment";
import Detail from "pages/client/product-detail/detail/Detail";
import Poster from "pages/client/product-detail/poster/Poster";
import ProductDetailProvider from "pages/client/product-detail/useProductDetail";
import useLogicProductDetail from "pages/client/product-detail/useProductDetail";
import React, { useEffect } from "react";
import "./ProductDetail.scss";
export default function ProductDetail() {
 return (
  <ProductDetailProvider className="product-detail">
   <div className="row">
    <div className="poster col-4">
     <Poster />
    </div>
    <div className="detail col-8">
     <Detail />
    </div>
   </div>
   <div className="comment">
    <Comment />
   </div>
  </ProductDetailProvider>
 );
}
