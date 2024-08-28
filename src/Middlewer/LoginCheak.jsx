import React, { useContext } from "react";
import { UserDataContext } from "./AuthWrapper";
import Page403 from "./Page403";

export default function LoginCheak({ children }) {
  const { UserDataHook } = useContext(UserDataContext);
  return (
    <div className="pageMainWraperr">
      {UserDataHook?.userData?.Token ? <>{children}</> : <Page403 />}
    </div>
  );
}
