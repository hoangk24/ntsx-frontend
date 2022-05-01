import App from "App";
import { StoreProvider } from "app/store";
import PaypalProvider from "components/paypal/PaypalProvider";
import Compose from "containers/compose/Compose";
import LoadingProvider from "hook/useLoading";
import SocketProvider from "hook/useSocket";
import React from "react";
import ReactDOM from "react-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./grid.css";
import "./index.css";

ReactDOM.render(
 <Compose
  components={[
   LoadingProvider,
   SocketProvider,
   PaypalProvider,
   StoreProvider,
  ]}>
  <App />
 </Compose>,
 document.getElementById("root")
);
