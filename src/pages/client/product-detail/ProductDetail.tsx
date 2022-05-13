import Comment from "pages/client/product-detail/comment/Comment";
import Detail from "pages/client/product-detail/detail/Detail";
import Poster from "pages/client/product-detail/poster/Poster";
import useLogicProductDetail from "pages/client/product-detail/useLogicProductDetail";
import React, { useEffect } from "react";
import "./ProductDetail.scss";
export default function ProductDetail() {
 const { description, detail, posters, fetchDetail } =
  useLogicProductDetail();

 return (
  <div className="product-detail">
   <div className="row">
    <div className="poster col-4">
     {posters && <Poster posters={posters} />}
    </div>
    <div className="detail col-8">
     {detail && <Detail data={detail} />}
    </div>
   </div>
   <div className="comment">
    <Comment />
   </div>
   <div className="suggest">suggest</div>
  </div>
 );
}
