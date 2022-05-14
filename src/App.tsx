import AdminRoute from "components/adminRoute/AdminRoute";
import ClientRoute from "components/adminRoute/ClientRoute";
import Compose from "containers/compose/Compose";
import CartAdmin from "pages/admin/cart/CartAdmin";
import Dashboard from "pages/admin/dashboard/Dashboard";
import DiscountAdmin from "pages/admin/discount/DiscountAdmin";
import Product from "pages/admin/product/ProductWrapper";
import UserWrapper from "pages/admin/user/UserWrapper";
import ChangePassword from "pages/auth/forgot-password/ChangePassword";
import FortgotPassword from "pages/auth/forgot-password/FortgotPassword";
import Login from "pages/auth/login/Login";
import Register from "pages/auth/register/Register";
import Verfied from "pages/auth/verfied/Verfied";
import CartManagement from "pages/client/cart-management/CartManagement";
import Cart from "pages/client/cart/Cart";
import Category from "pages/client/category/Category";
import Home from "pages/client/home/Home";
import Nsx from "pages/client/nsx/Nsx";
import PaymentSuccess from "pages/client/payment/PaymentSuccess";
import ProductDetail from "pages/client/product-detail/ProductDetail";
import Contact from "pages/contact/Contact";
import Errors from "pages/error/Errors";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
 return (
  <BrowserRouter>
   <Compose>
    <Routes>
     //! CLIENT ROUTE
     <Route path="/" element={<ClientRoute type="public" />}>
      <Route index element={<Home />} />
      <Route path="cart">
       <Route path={""} element={<Cart />} />
      </Route>
      <Route path="payment-success" element={<PaymentSuccess />} />
      <Route path="product">
       <Route path="nsx/:path" element={<Nsx />} />
       <Route path="category/:path" element={<Category />} />
       <Route path="detail/:id" element={<ProductDetail />} />
      </Route>
     </Route>
     <Route path="/" element={<ClientRoute type="private" />}>
      <Route path="cart">
       <Route path={"my-cart"} element={<CartManagement />} />
      </Route>
     </Route>
     //! ADMIN ROUTE
     <Route path="admin" element={<AdminRoute />}>
      <Route path="" element={<Dashboard />} />
      <Route path="product" element={<Product />} />
      <Route path="cart" element={<CartAdmin />} />
      <Route path="discount" element={<DiscountAdmin />} />
      <Route path="user" element={<UserWrapper />} />
     </Route>
     <Route path="login" element={<Login />} />
     <Route path="forgot-password" element={<FortgotPassword />} />
     <Route path="verified-email" element={<Verfied />} />
     <Route path="register" element={<Register />} />
     <Route path="change-password" element={<ChangePassword />} />
     <Route path="contact" element={<Contact />} />
     <Route path="*" element={<Errors />} />
    </Routes>
   </Compose>
  </BrowserRouter>
 );
}
