import {
 PayPalScriptProvider,
 ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import React, { ReactNode } from "react";
type Props = {
 children: React.ReactNode;
};

export default function PaypalProvider({ children }: Props) {
 const options = {
  "client-id":
   import.meta.env.VITE_CLIENT_ID ||
   "AbpVYNIhifd1sGCRXREus6oanzHHMNAVaR9BLXZFSSO9HCHitOvEQnxLsieZbGKDqKC1f71ms-7yY2rQ",
  "data-client-token": import.meta.env.VITE_DATA_CLIENT_TOKEN || "
  EHf1oHpizPuslQ6fQKC_BfBliqdKLUuMQaFtjHT49omr9UZw27jSRw2c-ORpvc4F4rihZfdW13evFbxb",
 };
 return (
  <PayPalScriptProvider options={options}>
   {children}
  </PayPalScriptProvider>
 );
}
