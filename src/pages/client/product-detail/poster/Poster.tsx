import { Image } from "antd";
import { IImage } from "constants/models/common.model";
import { useProductDetail } from "pages/client/product-detail/useProductDetail";
import React from "react";
import Slider, { Settings } from "react-slick";
import "./Poster.scss";

export default function Poster() {
 const { posters } = useProductDetail();
 const config: Settings = {
  slidesToScroll: 1,
  slidesToShow: 1,
  dots: true,
  arrows: false,
  dotsClass: "dot-group",
  customPaging: (i) => <img src={posters[i].url} alt="" />,
 };
 return (
  <Slider {...config} className="posters">
   {posters.map((it: IImage) => (
    <Image key={Math.random()} src={it.url} width="100%" />
   ))}
  </Slider>
 );
}
