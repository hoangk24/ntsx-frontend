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
  "client-id": import.meta.env.VITE_CLIENT_ID,
  "data-client-token": import.meta.env.VITE_DATA_CLIENT_TOKEN,
 };
 return (
  <PayPalScriptProvider options={options}>
   {children}
  </PayPalScriptProvider>
 );
}
