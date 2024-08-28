import React, { useContext } from "react";
import { UserDataContext } from "./Middlewer/AuthWrapper";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import WelcomePage from "./Pages/WelcomePage";
import RegisterForm from "./Pages/RegisterForm";
import Home from "./Pages/Home";
import LoginCheak from "./Middlewer/LoginCheak";
import LogoutCheak from "./Middlewer/LogoutCheak";
import ResetPassword from "./Pages/ResetPassword";

export default function App() {
  const { UserDataHook, setUserDataHook } = useContext(UserDataContext);
  return (
    <div className="main">
      <Routes>
        <Route
          path="/"
          element={
            UserDataHook?.userData ? <h1></h1>:
             <WelcomePage />
          }
        />

        <Route
          path="/home"
          element={
            <LoginCheak>
              <Home />
            </LoginCheak>
          }
        />
        <Route
          path="/login"
          element={
            <LogoutCheak>
              <Login />
            </LogoutCheak>
          }
        />
        <Route
          path="/signup"
          element={
            <LogoutCheak>
              <RegisterForm />
            </LogoutCheak>
          }
        />
        <Route
          path="/resetpassword"
          element={
            <LogoutCheak>
              <ResetPassword />
            </LogoutCheak>
          }
        />
      </Routes>
    </div>
  );
}
