import { Col, Row } from "antd";
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
   <Row gutter={[15, 15]}>
    <Col xl={8} sm={24} className="poster ">
     <Poster />
    </Col>
    <Col xl={16} xs={24} className="detail col-8">
     <Detail />
    </Col>
   </Row>
   <Comment />
  </ProductDetailProvider>
 );
}
