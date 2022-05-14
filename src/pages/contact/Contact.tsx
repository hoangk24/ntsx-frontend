import { Button, Result, Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./Contact.scss";
export default function Contact() {
 return (
  <div className="contact">
   <Result
    status={"info"}
    title="Thông tin liên hệ"
    subTitle="Hãy liên hệ với chúng tôi để được hỗ trợ">
    <Space direction="vertical">
     <Typography>Số Điện thoại : 0344184570</Typography>
     <Typography>
      Facebook: <a href="http://facebook.com/hoangtn4">Click here</a>
     </Typography>
    </Space>
   </Result>
  </div>
 );
}
