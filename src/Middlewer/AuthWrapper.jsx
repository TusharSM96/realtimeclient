import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
const UserDataContext = createContext();
function AuthWrapper({ children }) {
  const [UserDataHook, setUserDataHook] = useState({ userData: null });
  const [SelectMessageConvertionId, setSelectMessageConvertionId] =
    useState(null);
  useEffect(() => {
    let data = sessionStorage.getItem("UserCrid");
    if (data) {
      setUserDataHook({ userData: JSON.parse(data) });
    } else {
      setUserDataHook((prev) => prev);
    }
  }, []);
  return (
    <BrowserRouter>
      <UserDataContext.Provider
        value={{
          UserDataHook,
          setUserDataHook,
          setSelectMessageConvertionId,
          SelectMessageConvertionId,
        }}
      >
        {children}
      </UserDataContext.Provider>
    </BrowserRouter>
  );
}

export { AuthWrapper, UserDataContext };
