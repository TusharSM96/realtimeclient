import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Profile from "../assets/profile1.jpg";
import { useNavigate } from "react-router-dom";
import GlobalNotify from "../Componet/GlobalNotify";
import { UserLoginApi } from "../Servies/Apis";
import { UserDataContext } from "../Middlewer/AuthWrapper";

export default function Login() {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();
  const navigtor = useNavigate();
  const { setUserDataHook } = useContext(UserDataContext);
  const SubmitHandler = (data) => {
    if (data?.email?.trim() == "" || data?.Password?.trim() == "") {
      GlobalNotify("Kindly Fill Mandatory Fields", "i");
    } else {
      let body = {
        email: data.email,
        password: data?.Password,
      };
      UserLoginApi(body).then((resp) => {
        if (resp?.code == 200) {
          GlobalNotify(resp?.Msg, "s");
          reset();
          sessionStorage.setItem("UserCrid", JSON.stringify(resp?.data));
          setUserDataHook({ userData: resp?.data });
          navigtor("/home");
        } else {
          GlobalNotify(resp?.Msg, "e");
        }
      });
    }
  };

  return (
    <form
      className="signupmain"
      onPaste={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
      autoComplete="off"
      autoSave="off"
      autoCorrect="off"
      onSubmit={handleSubmit(SubmitHandler)}
    >
      <div className="signup_freame">
        <h1 className="text-white text-center">Welcome Back</h1>
        <h3 className="text-center">Signin to your Account</h3>

        <div className="loginProfile">
          <img alt="logo" src={Profile} />
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div>
              <label className="label">Email Address </label>
              <input
                autoFocus
                type="email"
                className={`form-control mt-2 ${
                  !!errors.email && "border-danger border-3"
                }`}
                {...register("email", {
                  required: true,
                })}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div>
              <label className="label">Password : </label>
              <input
                type="text"
                className={`form-control mt-2 ${
                  !!errors.Password && "border-danger border-3"
                }`}
                {...register("Password", {
                  required: true,
                  minLength: 6,
                })}
              />
            </div>
          </div>
          <label
            className="text-end text-info"
            style={{ fontSize: "20px" }}
            onClick={() => {
              navigtor("/resetpassword");
            }}
          >
            Reset Password
          </label>
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-3 text-center">
            <div>
              <button className="btn btn-lg btn-success" type="submit">
                Login
              </button>
              &nbsp; &nbsp; &nbsp;
              <button
                className="btn btn-lg btn-danger"
                type="button"
                onClick={() => {
                  navigtor("/signup");
                }}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
