import ClientRoute from "components/adminRoute/ClientRoute";
import useLoadRequired from "hook/useLoadRequired";
import CartAdmin from "pages/admin/cart/CartAdmin";
import Comment from "pages/admin/comment/Comment";
import Dashboard from "pages/admin/dashboard/Dashboard";
import DiscountAdmin from "pages/admin/discount/DiscountAdmin";
import Product from "pages/admin/product/Product";
import User from "pages/admin/user/User";
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
import Errors from "pages/error/Errors";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
export default function App() {
 useLoadRequired();

 return (
  <BrowserRouter>
   <Routes>
    //! CLIENT ROUTE
    <Route path="/" element={<ClientRoute />}>
     <Route index element={<Home />} />
     <Route path="cart">
      <Route path={""} element={<Cart />} />
      <Route path={"my-cart"} element={<CartManagement />} />
     </Route>
     <Route path="payment-success" element={<PaymentSuccess />} />
     <Route path="product">
      <Route path="nsx/:path" element={<Nsx />} />
      <Route path="category/:path" element={<Category />} />
      <Route path="detail/:id" element={<ProductDetail />} />
     </Route>
    </Route>
    //! ADMIN ROUTE
    <Route path="admin" element={<ClientRoute type="private" />}>
     <Route path="" element={<Dashboard />} />
     <Route path="product" element={<Product />} />
     <Route path="cart" element={<CartAdmin />} />
     <Route path="discount" element={<DiscountAdmin />} />
     <Route path="user" element={<User />} />
     <Route path="comment" element={<Comment />} />
    </Route>
    <Route path="login" element={<Login />} />
    <Route path="verified-email" element={<Verfied />} />
    <Route path="register" element={<Register />} />
    <Route path="*" element={<Errors />} />
   </Routes>
  </BrowserRouter>
 );
}
