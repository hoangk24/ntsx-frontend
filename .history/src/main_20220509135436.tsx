import App from "App";
import { StoreProvider } from "app/store";
import PaypalProvider from "components/paypal/PaypalProvider";
import Compose from "containers/compose/Compose";
import LoadingProvider from "hook/useLoading";
import SocketProvider from "hook/useSocket";
import React from "react";
import ReactDOM from "react-dom";

import ProductProvider from "pages/admin/product/product/useLogicProduct";
import DiscountProvider from "pages/admin/discount/useDiscount";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./index.css";
import "./grid.css";
ReactDOM.render(
 <Compose
  components={[
   LoadingProvider,
   SocketProvider,
   PaypalProvider,
   StoreProvider,
   ProductProvider,
   DiscountProvider,
  ]}>
  <App />
 </Compose>,
 document.getElementById("root")
);
