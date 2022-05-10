import { Tabs } from "antd";
import Compose from "containers/compose/Compose";
import Category from "pages/admin/product/category/Category";
import NsxProvider from "pages/admin/product/category/useNSX";
import Product from "pages/admin/product/product/Product";
import ProductProvider from "pages/admin/product/product/useLogicProduct";
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
