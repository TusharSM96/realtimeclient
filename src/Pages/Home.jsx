import React from "react";
import NavBar from "../Componet/NavBar";
import ChatMainWindow from "../Componet/ChatMainWindow";
import { SocketClientWrapper } from "../SocketContext/SocketContext";
export default function Home() {
  return (
    <SocketClientWrapper>
      <div className="homepagemainwrapper">
        <NavBar />
        <ChatMainWindow />
      </div>
    </SocketClientWrapper>
  );
}
