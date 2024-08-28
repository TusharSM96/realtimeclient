import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import IMAGES from "../assets/reset.webp";
import GlobalNotify from "../Componet/GlobalNotify";
import { ForgetPasswordApi } from "../Servies/Apis";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../Middlewer/AuthWrapper";
export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigator = useNavigate();
  const { setUserDataHook } = useContext(UserDataContext);
  const SubmitHandler = (data) => {
    if (data.Password == data.NewPassword) {
      return GlobalNotify("Password And New Password is Same", "e");
    }
    if (data.NewPassword != data.ConfPassword) {
      return GlobalNotify("New Password And Confirm Password is Not Same", "e");
    }
    ForgetPasswordApi({
      email: data.email,
      password: data.Password,
      newpassword: data.NewPassword,
    }).then((resp) => {
      if (resp.code == 200) {
        GlobalNotify(resp.Msg, "s");
        reset();
        sessionStorage.setItem("UserCrid", JSON.stringify(resp?.data));
        setUserDataHook({ userData: resp?.data });
        navigator("/home");
      } else {
        GlobalNotify(resp.Msg, "e");
      }
      // if(resp)
    });
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
        <div className="loginProfile">
          <img alt="logo" src={IMAGES} style={{ background: "#e0e0e0" }} />
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div>
              <label className="label">Email Address : </label>
              <input
                type="email"
                autoFocus
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
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div>
              <label className="label">New Password : </label>
              <input
                type="text"
                className={`form-control mt-2 ${
                  !!errors.NewPassword && "border-danger border-3"
                }`}
                {...register("NewPassword", {
                  required: true,
                  minLength: 6,
                })}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div>
              <label className="label">Confirm Password : </label>
              <input
                type="text"
                className={`form-control mt-2 ${
                  !!errors.ConfPassword && "border-danger border-3"
                }`}
                {...register("ConfPassword", {
                  required: true,
                  minLength: 6,
                })}
              />
            </div>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-3 text-center">
            <div>
              <button className="btn btn-lg btn-success" type="submit">
                Reset
              </button>
              &nbsp; &nbsp; &nbsp;
              <button className="btn btn-lg btn-danger" type="button" onClick={()=>{
                navigator('/login')
              }}>
                login
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
