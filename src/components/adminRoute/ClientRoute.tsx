import { message } from "antd";
import { RootState } from "app/store";
import { Role } from "constants/models/auth.model";
import DefaultLayout from "containers/layout/Layout";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
type RouteType = "private" | "public";
ClientRoute.defaultProps = {
 type: "public",
};
export default function ClientRoute({ type }: { type: RouteType }) {
 const { isLogin, user } = useSelector(
  (state: RootState) => state?.auth
 );
 if (type === "private") {
  return isLogin && user ? (
   <DefaultLayout>
    <Outlet />
   </DefaultLayout>
  ) : (
   <Navigate to="/login" />
  );
 }
 return (
  <DefaultLayout>
   <Outlet />
  </DefaultLayout>
 );
}
