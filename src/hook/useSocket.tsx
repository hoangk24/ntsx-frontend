import React, { createContext, useContext, useEffect } from "react";
import io, { Socket } from "socket.io-client";

interface ISocket {
 socket: Socket;
}
const socket = io("http://localhost:5005");

export const SocketContext = createContext<ISocket>({ socket });
export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({ children }: any) {
 return (
  <SocketContext.Provider value={{ socket }}>
   {children}
  </SocketContext.Provider>
 );
}
