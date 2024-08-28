import React from "react";
import { FaUserTie } from "react-icons/fa";

export default function Conversioncard({username,time,Message,onClick}) {
  return (
    <div className="convertion" onClick={onClick}>
      <FaUserTie size={40} />
      &nbsp;
      &nbsp;
      <div className="cardconvertiondetails">
        <div className="nametime">
          <b>{username}</b>
          <small>{time}</small>
        </div>
        <span>{Message}</span>
      </div>
    </div>
  );
}
