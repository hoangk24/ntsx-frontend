import { HeartOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Space, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import classNames from "classnames";
import { IProduct } from "constants/models/product.model";
import { stringify, stringifyUrl } from "query-string";
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "utils/common";
import saleImage from "./sale.png";
import "./ProductCard.scss";
type Props = {
 data: IProduct;
 className?: string;
};
export default function ProductCard({ data, className }: Props) {
 const navigate = useNavigate();
 const { Text, Link } = Typography;

 return (
  <Card
   className={classNames("product-card", className)}
   hoverable
   cover={
    <img
     onClick={() => navigate(`/product/detail/${data?._id}`)}
     src={data.posters?.[0]?.url}
    />
   }>
   <Meta title={data?.name} />
   {data?.discount > 0 && (
    <img className="sale-img" src={saleImage} alt="" />
   )}
   <Meta
    title={
     <Space className="">
      {data.discount > 0 ? (
       <>
        <Text type="danger">
         {formatMoney(data?.price - data?.discount)}
        </Text>
        <Text delete>{formatMoney(data?.price)}</Text>
       </>
      ) : (
       formatMoney(data?.price)
      )}
     </Space>
    }
    description={data?.note.substring(0, 50)}
   />
  </Card>
 );
}
