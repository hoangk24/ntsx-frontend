/// <reference types="vite/client" />
import React from "react";

declare global {
 namespace React {
  interface ImgHTMLAttributes<T> :any
 }
}
