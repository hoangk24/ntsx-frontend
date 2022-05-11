import React, { createContext, useContext, useState } from "react";

const ConfirmContext = createContext({});
export const useConfirm = (data: {
 question: string;
 //  onOk: () => void;
 //  onCancle?: () => void;
}) => useContext(ConfirmContext);

interface Props {
 children: React.ReactNode;
}
export default function ConfirmProvider({ children }: Props) {
 const [visible, setVisible] = useState(false);
 return (
  <ConfirmContext.Provider
   value={{
    open: () => setVisible(true),
    hide: () => setVisible(false),
   }}>
   {children}
  </ConfirmContext.Provider>
 );
}
