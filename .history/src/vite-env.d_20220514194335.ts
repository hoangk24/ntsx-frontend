/// <reference types="vite/client" />
declare global {
 namespace React {
  interface ImgHTMLAttributes<T> {
   loading?: "lazy" | "eager" | "auto";
  }
 }
}
