import { Col, Row, Space, Typography } from "antd";
import { IProduct } from "constants/models/product.model";
import { useProduct } from "hook/useProduct";
import ProductCard from "pages/components/product-card/ProductCard";
import React, { useMemo, useState } from "react";
import "./Product.scss";
export default function ProductListing() {
 const { products } = useProduct();

 const mapProduct = useMemo(() => {
  return products?.map((it: IProduct) => (
   <Col
    key={Math.random()}
    xxl={{ span: 3 }}
    xl={{ span: 4 }}
    sm={{ span: 8 }}
    xs={{ span: 24 }}>
    <ProductCard className="product-card" data={it} />
   </Col>
  ));
 }, [products]);

 return (
  <Space className="product mt-3" direction="vertical">
   <Typography.Title className="product-title">
    Danh sách sản phẩm
   </Typography.Title>
   <Row gutter={[5, 5]}>{mapProduct}</Row>
  </Space>
 );
}
