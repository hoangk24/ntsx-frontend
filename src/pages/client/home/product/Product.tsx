import { Col, Row, Space, Typography } from "antd";
import { IProduct } from "constants/models/product.model";
import { useProduct } from "hook/useProduct";
import ProductCard from "pages/components/product-card/ProductCard";
import React, { useMemo, useState } from "react";
import "./Product.scss";
export default function ProductListing() {
 const { products } = useProduct();

 const mapProduct = useMemo(() => {
  if (products?.length)
   return products.map((it: IProduct) => (
    <Col key={Math.random()} span={4}>
     <ProductCard className="product-card" data={it} />
    </Col>
   ));
  else return <>Loading....</>;
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
