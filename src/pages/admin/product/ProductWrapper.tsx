import { Tabs } from "antd";
import Category from "pages/admin/product/category/Category";
import Product from "pages/admin/product/product/Product";
import React from "react";

export default function ProductWrapper() {
 return (
  <Tabs defaultActiveKey="1">
   <Tabs.TabPane tab="Sản phẩm" key={1}>
    <Product />
   </Tabs.TabPane>
   <Tabs.TabPane tab="Danh mục" key={2}>
    <Category />
   </Tabs.TabPane>
  </Tabs>
 );
}
