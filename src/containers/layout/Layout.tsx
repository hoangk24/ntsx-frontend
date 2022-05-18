import {
 MenuFoldOutlined,
 MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Tabs } from "antd";
import { RootState } from "app/store";
import { Role } from "constants/models/auth.model";
import Auth from "containers/auth/Auth";
import MenuAdmin from "containers/auth/MenuAdmin";
import MenuUser from "containers/auth/MenuUser";
import useBreakpoint from "hook/useBreakpoint";
import useEffectSkipFisrtRender from "hook/useEffectSkipFisrtRender";
import { useSocket } from "hook/useSocket";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Layout.scss";
import logo from "./logo.png";

export default function DefaultLayout({ children }: any) {
 const { Header, Sider, Content, Footer } = Layout;
 const { user, isLogin } = useSelector(
  (state: RootState) => state.auth
 );
 const [collapsed, setCollapsed] = useState(false);
 const { userOnline } = useSocket();
 const point = useBreakpoint();
 const navigate = useNavigate();
 useEffect(() => {
  if (point === "lg") {
   setCollapsed(false);
  } else {
   setCollapsed(true);
  }
 }, [point]);

 return (
  <Layout className="wrapper">
   <Sider
    collapsible
    collapsed={collapsed}
    onCollapse={setCollapsed}
    className="sider"
    trigger={null}
    style={{
     margin: collapsed ? -200 : 0,
     height: "100vh",
     position: !collapsed ? "fixed" : "absolute",
     left: 0,
     top: 0,
     bottom: 0,
     transition: "0.3s",
     zIndex: 99999,
    }}>
    {!collapsed && (
     <>
      <div className={"logo"} onClick={() => navigate("/")}>
       <img src={logo} alt="" />
      </div>
      {user && [Role.ADMIN, Role.MASTER].includes(user.role) ? (
       <Tabs defaultActiveKey="1">
        <Tabs.TabPane className="tabkey" tab="Admin" key={"1"}>
         <MenuAdmin />
        </Tabs.TabPane>
        <Tabs.TabPane className="tabkey" key={"2"} tab="Client">
         <MenuUser />
        </Tabs.TabPane>
       </Tabs>
      ) : (
       <MenuUser />
      )}
     </>
    )}
   </Sider>
   <Layout
    className="site-layout"
    style={{
     transition: "0.3s",
     marginLeft: point === "lg" ? 200 : 0,
    }}>
    <Header className="header">
     <div className="header-start">
      <Button
       className="btn-collapsed"
       onClick={() => setCollapsed(false)}
       icon={
        collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
       }
      />
      <h3>Hello {user?.fullName}, have a nice day</h3>
     </div>
     <div className="header-end">
      <Auth />
     </div>
    </Header>
    <Content className="content">{children}</Content>
    <Footer className="footer">
     Ant Design ©2018 Created by NTX TEAM - Thành viên Online
     {userOnline || 0}
    </Footer>
   </Layout>
  </Layout>
 );
}
