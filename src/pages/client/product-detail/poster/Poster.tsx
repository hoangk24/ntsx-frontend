import { Image } from "antd";
import { IImage } from "constants/models/common.model";
import React from "react";
import Slider, { Settings } from "react-slick";
import "./Poster.scss";
type Props = {
 posters: IImage[];
};
export default function Poster({ posters }: Props) {
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
