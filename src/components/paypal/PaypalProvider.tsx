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
   "AbpVYNIhifd1sGCRXREus6oanzHHMNAVaR9BLXZFSSO9HCHitOvEQnxLsieZbGKDqKC1f71ms-7yY2rQ",
 };
 return (
  <PayPalScriptProvider options={options}>
   {children}
  </PayPalScriptProvider>
 );
}
