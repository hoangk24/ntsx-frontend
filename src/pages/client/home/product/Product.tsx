import { Button, Col, Row } from "antd";
import { IProduct } from "constants/models/product.model";
import { useProduct } from "hook/useProduct";
import ProductCard from "pages/components/product-card/ProductCard";
import ProductCardLoading from "pages/components/product-card/ProductCardLoading";
import React, { useMemo } from "react";
import { formatMoney } from "utils/common";
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
  <div className="product">
   <h1 className="product-title">Danh sách sản phẩm</h1>
   <Row gutter={[5, 5]}>{mapProduct}</Row>
  </div>
 );
}
