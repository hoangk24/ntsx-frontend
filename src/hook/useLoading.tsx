import Loading from "components/loading/Loading";
import React, { createContext, useContext, useState } from "react";

interface ILoading {
 hide: () => void;
 show: () => void;
}
export const LoadingContext = createContext<ILoading | null>(null);
export const useLoading = () => useContext(LoadingContext);

export default function LoadingProvider({ children }: any) {
 const [show, setShow] = useState<boolean>(false);
 return (
  <LoadingContext.Provider
   value={{ show: () => setShow(true), hide: () => setShow(false) }}>
   {show && <Loading />}
   {children}
  </LoadingContext.Provider>
 );
}
