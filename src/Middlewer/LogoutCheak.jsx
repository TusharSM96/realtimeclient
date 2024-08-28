import React, { useContext } from "react";
import { UserDataContext } from "./AuthWrapper";
import Page403Logout from "./Page403Logout";

export default function LogoutCheak({ children }) {
  const { UserDataHook } = useContext(UserDataContext);
  return (
    <>
      {UserDataHook?.userData?.mobileno ? <Page403Logout /> : <>{children}</>}
    </>
  );
}
