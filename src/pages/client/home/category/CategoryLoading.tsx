import { Skeleton } from "antd";
import React from "react";

export default function CategoryLoading() {
 return (
  <div className="d-flex col-3">
   <Skeleton.Image></Skeleton.Image>
   <div className="ml-2">
    <Skeleton.Input block></Skeleton.Input>
    <Skeleton.Input block></Skeleton.Input>
    <Skeleton.Input block></Skeleton.Input>
   </div>
  </div>
 );
}
