import { Space } from "antd";
import Banner from "pages/client/home/banner/Banner";
import HomeCategory from "pages/client/home/category/HomeCategory";
import ProductListing from "pages/client/home/product/Product";
import React from "react";

export default function Home() {
 return (
  <>
   <Banner />
   <Space direction="vertical">
    <HomeCategory />
    <ProductListing />
   </Space>
  </>
 );
}
