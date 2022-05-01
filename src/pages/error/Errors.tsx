import { Result, Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Errors.scss";
export default function Errors() {
 const navigate = useNavigate();
 return (
  <div className="error">
   <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
     <Button onClick={() => navigate("/")} type="primary">
      Back Home
     </Button>
    }
   />
  </div>
 );
}
