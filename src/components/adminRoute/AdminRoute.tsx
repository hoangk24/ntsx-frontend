import { message } from "antd";
import { RootState } from "app/store";
import { Role } from "constants/models/auth.model";
import DefaultLayout from "containers/layout/Layout";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function AdminRoute() {
 const { isLogin, user } = useSelector(
  (state: RootState) => state?.auth
 );
 const navigate = useNavigate();

 return isLogin && user?.role === Role.ADMIN ? (
  <DefaultLayout>
   <Outlet />
  </DefaultLayout>
 ) : (
  <Navigate to="/login" />
 );
}
