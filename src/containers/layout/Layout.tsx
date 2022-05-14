import { Input, Layout, Tabs } from "antd";
import { RootState } from "app/store";
import { Role } from "constants/models/auth.model";
import Auth from "containers/auth/Auth";
import MenuAdmin from "containers/auth/MenuAdmin";
import MenuUser from "containers/auth/MenuUser";
import React from "react";
import { useSelector } from "react-redux";
import "./Layout.scss";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";

export default function DefaultLayout({ children }: any) {
 const { Header, Sider, Content } = Layout;
 const { user } = useSelector((state: RootState) => state.auth);
 const navigate = useNavigate();
 return (
  <Layout style={{ minHeight: "100vh" }} className="wrapper">
   <Sider
    className="sider"
    trigger={null}
    style={{
     overflow: "auto",
     height: "100vh",
     position: "fixed",
     left: 0,
     top: 0,
     bottom: 0,
    }}>
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
   </Sider>
   <Layout className="site-layout" style={{ marginLeft: 200 }}>
    <Header className="site-layout-background header">
     <div className="header-start">
      <h3>Hello {user?.fullName}, have a nice day</h3>
     </div>
     <div className="header-center"></div>
     <Auth />
    </Header>
    <Content
     className="site-layout-background"
     style={{
      margin: "24px 16px",
      padding: 24,
     }}>
     {children}
    </Content>
   </Layout>
  </Layout>
 );
}
