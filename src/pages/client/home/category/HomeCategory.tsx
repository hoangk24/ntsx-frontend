import { RootState } from "app/store";
import { ICategory } from "constants/models/category.model";
import React, { useMemo } from "react";
import logoExample from "./logoExample.png";
import { useSelector } from "react-redux";
import "./Category.scss";
import { useNavigate } from "react-router-dom";
import { Col, Row, Typography } from "antd";

export default function HomeCategory() {
 const categories = useSelector(
  (state: RootState) => state.category.categories
 );
 const navigate = useNavigate();

 const mapCatgegories = useMemo(() => {
  return categories?.map((it: ICategory) => (
   <Col
    xl={6}
    sm={12}
    xs={24}
    className="category-btn"
    key={Math.random()}
    onClick={() => navigate(`/product/category/${it.path}`)}>
    <div className="content">
     <img src={it.logos.url} alt="" />
     <div className="">
      <h3>{it.name}</h3>
      <span>Best choice</span>
     </div>
    </div>
   </Col>
  ));
 }, [categories]);

 return (
  <div className="home-category">
   <Typography.Title>Danh mục sản phẩm</Typography.Title>
   <Row gutter={[5, 5]} className="category">
    {mapCatgegories}
   </Row>
  </div>
 );
}
