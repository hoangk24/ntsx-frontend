import { fn } from "moment";
import React, { useEffect, useRef } from "react";

export default function useEffectSkipFisrtRender(
 fn: () => void,
 inputs: any
) {
 const didMountRef = useRef(false);
 useEffect(() => {
  if (didMountRef.current) {
   return fn();
  }
  didMountRef.current = true;
 }, inputs);
}
