import {
 ShoppingCartOutlined,
 UploadOutlined,
 UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown, Menu, Space } from "antd";
import { useAppSelector } from "app/store";
import useLogOut from "containers/auth/useLogOut";
import useCart from "hook/useCart";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Auth() {
 const navigate = useNavigate();
 const { user, isLogin } = useAppSelector().auth;
 const { preview, carts } = useAppSelector().cart;
 const { fetchLogOut } = useLogOut();
 const { getPreviewCart } = useCart();
 useEffect(() => {
  getPreviewCart();
 }, [carts]);

 const menuUser = (
  <Menu>
   <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
    <Link to={"/cart/my-cart"}> Đơn hàng</Link>
   </Menu.Item>
   <Menu.Item
    key="3"
    icon={<UploadOutlined />}
    onClick={() => fetchLogOut()}>
    Đăng xuất
   </Menu.Item>
  </Menu>
 );
 return (
  <Space className="header-end">
   <Badge count={preview?.totalQuantity} showZero>
    <Button
     onClick={() => navigate("/cart")}
     icon={<ShoppingCartOutlined />}
    />
   </Badge>
   {isLogin ? (
    <Dropdown overlay={menuUser} placement="bottomRight">
     <Avatar
      size={40}
      src={user?.avatar}
      icon={!user?.avatar ? <UserOutlined /> : null}
     />
    </Dropdown>
   ) : (
    <Button onClick={() => navigate("/login")}>Đăng nhập</Button>
   )}
  </Space>
 );
}
