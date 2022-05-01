import { Avatar, Card, Skeleton } from "antd";
import Meta from "antd/lib/card/Meta";
import classNames from "classnames";
import React from "react";
export default function ProductCardLoading({
 className,
}: {
 className: string;
}) {
 return (
  <Card className={classNames(className)}>
   <Skeleton.Image></Skeleton.Image>
   <Skeleton loading={true} active>
    <Meta
     avatar={<Avatar src="" />}
     title="Card title"
     description="This is the description"
    />
   </Skeleton>
  </Card>
 );
}
