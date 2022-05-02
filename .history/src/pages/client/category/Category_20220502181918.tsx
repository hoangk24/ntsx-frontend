import React, { useEffect, useMemo } from "react";
import { IProduct } from "constants/models/product.model";
import { Col, Result, Row } from "antd";
import HomeCategory from "pages/home/category/HomeCategory";
import useCategory from "pages/client/nsx/useNsx";

function Category() {
 const { getProduct, product, path } = useCategory();
 useEffect(() => {
  getProduct();
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
   <Row gutter={5} className={"mt-5"}>
    {product.map((it: IProduct) => (
     <Col span={4}>
      <ProductCard key={Math.random()} data={it} className={""} />
     </Col>
    ))}
   </Row>
  );
 }, [product]);
 return (
  <div>
   <HomeCategory />
   {mapProduct}
  </div>
 );
}

export default Category;
