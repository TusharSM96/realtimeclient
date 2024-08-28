import React from "react";
import Imag from "../assets/logo.jpg";
import { HiMiniChatBubbleBottomCenter } from "react-icons/hi2";
import { Link } from "react-router-dom";
export default function WelcomePage() {
  return (
    <div className="welcome_main">
      <h1 style={{ fontSize: "40px" }}>Welcome to ChatApp</h1>
      <br />
      <img src={Imag} alt="logo" width={200} height={200} />
      <br />
      <h1 className="color" style={{ fontSize: "50px" }}>
        Chat &nbsp;
        <HiMiniChatBubbleBottomCenter color="#ff0fe4" /> &nbsp; Vat
      </h1>
      <p className="color">
        Connect with friends and family with ChatApp. Send messages, share
        <br />
        photos, and stay connected wherever you are.
      </p>
      <div className="features">
        <h2>Key Features</h2>
        <ul>
          <li>Real-time messaging</li>
          <li>Group chats</li>
        </ul>
      </div>
      <div className="cta">
        <Link to={"/signup"} className="btn btn-danger">
          Register
        </Link>
        &nbsp;
        <Link to={"/login"} className="btn btn-success">
          Login
        </Link>
        &nbsp;
      </div>
    </div>
  );
}
