import React, { useContext } from "react";
import { UserDataContext } from "./AuthWrapper";
import { useNavigate } from "react-router-dom";

export default function Page403Logout() {
  const { setUserDataHook } = useContext(UserDataContext);
  const navigater = useNavigate();
  const LogoutHandler = () => {
    setUserDataHook({ userData: null });
    sessionStorage.clear();
  };
  const BackHandler = () => {
    navigater("/home");
  };
  return (
    <div className="page_403">
      <h1>Your Are Already Login </h1>
      <br />
      <b>Plase Logout First</b>
      <br />
      <br />
      <div>
        <button className="btn btn-warning btn-lg" onClick={LogoutHandler}>
          Logout
        </button>
        &nbsp; &nbsp; &nbsp;
        <button className="btn btn-success btn-lg" onClick={BackHandler}>
          Back To Home Page
        </button>
      </div>
    </div>
  );
}
