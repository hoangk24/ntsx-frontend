import {
 BankOutlined,
 BarcodeOutlined,
 DropboxOutlined,
 ShoppingOutlined,
 UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function MenuAdmin() {
 return (
  <Menu theme="dark" mode="inline">
   <Menu.Item key="1" icon={<BankOutlined />}>
    <Link to={"/admin"}>Dashboard</Link>
   </Menu.Item>
   <Menu.Item key="2" icon={<UsergroupDeleteOutlined />}>
    <Link to={"/admin/user"}>Users</Link>
   </Menu.Item>
   <Menu.Item key="3" icon={<DropboxOutlined />}>
    <Link to={"/admin/product"}>Products</Link>
   </Menu.Item>
   <Menu.Item key="4" icon={<BarcodeOutlined />}>
    <Link to={"/admin/discount"}>Discounts</Link>
   </Menu.Item>
   <Menu.Item key="5" icon={<ShoppingOutlined />}>
    <Link to={"/admin/cart"}>Cart</Link>
   </Menu.Item>
  </Menu>
 );
}
