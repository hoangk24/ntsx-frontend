import React from "react";
import image1 from "./banner1.jpg";
import image2 from "./banner2.jpg";
import image3 from "./banner1.jpg";
import image4 from "./banner2.jpg";
import Slider, { Settings } from "react-slick";
import "./Banner.scss";
export default function Banner() {
 const source = [image1, image2, image3, image4];
 const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  arrows: false,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  dotsClass: "group-array-image",
  customPaging: (i) => (
   <a>
    <img src={source[i]} alt="" />
   </a>
  ),
 };
 return (
  <div>
   <Slider {...settings} className="banner">
    {source.map((it: any, idx: number) => (
     <img key={idx} src={it} alt="" />
    ))}
   </Slider>
  </div>
 );
}
