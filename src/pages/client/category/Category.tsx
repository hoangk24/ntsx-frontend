import React, { useEffect, useMemo } from "react";
import { IProduct } from "constants/models/product.model";
import { Col, Result, Row, Space } from "antd";
import ProductCard from "pages/components/product-card/ProductCard";
import HomeCategory from "pages/client/home/category/HomeCategory";
import { useCategory } from "hook/useCategory";
import { useParams } from "react-router-dom";

function Category() {
 const { product, getProduct } = useCategory();
 const { path } = useParams();

 useEffect(() => {
  getProduct(path);
 }, [path]);

 const mapProduct = useMemo(() => {
  if (!product.length)
   return (
    <Result
     status={"404"}
     subTitle={"Danh mục này chưa có sản phẩm"}
    />
   );
  return (
   <Row gutter={[15, 15]} className="mt-5">
    {product.map((it: IProduct) => (
     <Col xs={24} sm={8} lg={4} key={Math.random()}>
      <ProductCard key={Math.random()} data={it} />
     </Col>
    ))}
   </Row>
  );
 }, [product]);
 return (
  <Space direction="vertical">
   <HomeCategory />
   {mapProduct}
  </Space>
 );
}

export default Category;
