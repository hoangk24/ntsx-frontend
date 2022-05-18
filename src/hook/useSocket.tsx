import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "app/store";
import { setLogOut } from "features/auth/auth.slice";
import React, {
 createContext,
 useContext,
 useEffect,
 useState,
} from "react";
import { useNavigate } from "react-router-dom";
import io, { Socket } from "socket.io-client";

interface ISocket {
 socket: Socket;
 userOnline: number;
}
const socket = io(import.meta.env.VITE_API_ENDPOINT);

export const SocketContext = createContext<ISocket>({} as ISocket);
export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({ children }: any) {
 const [userOnline, setUserOnline] = useState(0);
 const { user, isLogin } = useAppSelector().auth;
 const dispatch = useAppDispatch();
 const navigate = useNavigate();

 useEffect(() => {
  if (isLogin) {
   socket.emit("joinRoom", user?._id);

   socket.on("countUser", (count) => {
    console.log(
     "🚀 ~ file: useSocket.tsx ~ line 34 ~ socket.on ~ count",
     count
    );
    setUserOnline(count);
   });

   socket.on("userWasLocked", (id) => {
    if (id === user?._id) {
     Modal.confirm({
      title:
       "Tài khoản của bạn đã bị khoá! Hãy liên hệ với Admin để được hỗ trợ",
      okText: "Liên hệ Admin",
      cancelText: "Thoát",
      onOk: () => navigate("/contact"),
      onCancel: () => {
       dispatch(setLogOut());
       navigate("/login");
      },
     });
    }
   });
  }
 }, [socket]);
 return (
  <SocketContext.Provider value={{ socket, userOnline }}>
   {children}
  </SocketContext.Provider>
 );
}
