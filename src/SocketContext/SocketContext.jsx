import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UserDataContext } from "../Middlewer/AuthWrapper";
export const SocketClientContext = createContext(null);
export const SocketClientWrapper = ({ children }) => {
  const [SocketClient, setSocketClient] = useState(null);
  const { UserDataHook, setUserDataHook } = useContext(UserDataContext);
  useEffect(() => {
    // Initialize socket client
    // const socket = io("https://realtimechatbacked.vercel.app", {
      // const socket = io("http://localhost:8080", {
        const socket = io("https://realtimechatbacked.onrender.com", {
      transports: ["websocket"], // Use WebSocket transport
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 5000,
      query: {
        userId: UserDataHook?.userData?._id,
        email: UserDataHook?.userData?.email,
      },
    });
    // Setup socket event listeners
    socket.on("connect", () => {
      setUserDataHook((prev) => {
        let dataCopy = { ...prev.userData, socketId: socket.id };
        return { userData: dataCopy };
      });
      setSocketClient(socket);
    });
    // Cleanup function
    return () => socket.disconnect();
  }, []); // Add dependencies if needed

  return (
    <SocketClientContext.Provider value={{ SocketClient, setSocketClient }}>
      {children}
    </SocketClientContext.Provider>
  );
};
