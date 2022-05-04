import { Button, Result } from "antd";
import useVerifed from "pages/auth/verfied/useVerifed";
import React, { useEffect, useState } from "react";
import "./Verified.scss";
export default function Verfied() {
 const { verifed, error } = useVerifed();
 useEffect(() => {
  verifed();
 }, []);
 if (error)
  return (
   <div className="verified">
    <Result
     status={"error"}
     title="Thất bại "
     subTitle="Mã xác nhận của bạn đã sai hoặc đã hết hạn"></Result>
   </div>
  );
 return (
  <div className="verified">
   <Result
    status={"success"}
    title="Thành công"
    subTitle="Đăng ký thành công"
   />
  </div>
 );
}
