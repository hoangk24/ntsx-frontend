import React, { useEffect, useState } from "react";
import _throttle from "lodash/throttle";
const getDeviceConfig = (width: number) => {
 if (width < 320) {
  return "xs";
 } else if (width >= 320 && width < 720) {
  return "sm";
 } else if (width >= 720 && width < 1024) {
  return "md";
 } else if (width >= 1024) {
  return "lg";
 }
};
export default function useBreakpoint() {
 const [brkPnt, setBrkPnt] = useState(() =>
  getDeviceConfig(window.innerWidth)
 );
 useEffect(() => {
  const calcInnerWidth = _throttle(function () {
   setBrkPnt(getDeviceConfig(window.innerWidth));
  }, 200);
  window.addEventListener("resize", calcInnerWidth);
  return () => window.removeEventListener("resize", calcInnerWidth);
 }, []);
 return brkPnt;
}
