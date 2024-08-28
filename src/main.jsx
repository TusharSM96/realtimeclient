import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthWrapper } from "./Middlewer/AuthWrapper.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick={true}
      rtl={false}
      draggable
      pauseOnHover
      theme="dark"
    />
    <AuthWrapper>
      <App />
    </AuthWrapper>
  </>
);
