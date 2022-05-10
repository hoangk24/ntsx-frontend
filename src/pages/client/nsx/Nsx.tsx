import React, { useEffect, useMemo } from "react";
import { Col, Result, Row } from "antd";
import { IProduct } from "constants/models/product.model";
import ProductCard from "pages/components/product-card/ProductCard";
import { useNsx } from "hook/useNSX";
import { useParams } from "react-router-dom";

function Nsx() {
 const { product, getProduct } = useNsx();
 const { path } = useParams();
 const mapProduct = useMemo(() => {
  if (!product.length)
   return (
    <Result
     status={"404"}
     subTitle={"Chưa có sản phẩm cho nhà sản xuất này"}
    />
   );
  return (
   <Row gutter={15}>
    {product?.map((it: IProduct) => (
     <Col span={4} key={Math.random()}>
      <ProductCard data={it} className={""} />
     </Col>
    ))}
   </Row>
  );
 }, [path, product]);

 useEffect(() => {
  getProduct(path);
 }, [path]);

 return <div>{mapProduct}</div>;
}

export default Nsx;
