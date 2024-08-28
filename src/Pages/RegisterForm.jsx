import React from "react";
import { useForm } from "react-hook-form";
import GlobalNotify from "../Componet/GlobalNotify";
import { CreateUserApi } from "../Servies/Apis";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigator = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gender: "Male", // Set default value for 'gender'
    },
  });
  const navigtor = useNavigate();
  const GetBase64data = (data) => {
    return new Promise((resolve, reject) => {
      const Reader = new FileReader();
      Reader.readAsDataURL(data);
      Reader.onload = () => {
        const base64 = Reader.result.split(",")[1];
        let Data = {
          Base64: base64,
          filename: data.name,
          filesize: data.size,
          type: data.type,
        };
        resolve(JSON.stringify(Data)); // Resolve the promise with the Base64 string
      };
      Reader.onerror = (error) => {
        reject(error); // Reject the promise if there's an error
      };
    });
  };

  const SubmitHandler = async (data) => {
    let GetBase64 = data?.photo?.length
      ? await GetBase64data(data?.photo[0])
      : {};
    if (data?.photo?.length && GetBase64?.filesize >= 200000) {
      return GlobalNotify(
        "File size exceeds the maximum allowed limit (2MB). Please choose a smaller file.",
        "e"
      );
    }
    const Data = {
      fullname: data.fullname,
      username: data.username.toUpperCase(),
      mobileno: data.mobile,
      gender: data.gender,
      dob: data.dob,
      password: data.Password,
      email: data.email,
      profilePhoto: GetBase64,
    };
    CreateUserApi(Data).then((resp) => {
      if (resp.code === 200) {
        GlobalNotify(resp?.Msg, "s");
        navigator("/login", { state: "tests" });
        return reset();
      } else {
        return GlobalNotify(resp?.Msg, "e");
      }
    });
  };
  return (
    <form
      className="signupmain"
      onPaste={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
      onSubmit={handleSubmit(SubmitHandler)}
      autoComplete="off"
      autoSave="off"
      autoCorrect="off"
    >
      <div className="signup_freame">
        <h1 className="coloraqua">Create New Account</h1>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div>
              <label className="label">Full Name : </label>
              <input
                autoFocus
                type="text"
                className={`form-control mt-2 ${
                  !!errors.fullname && "border-danger border-3"
                }`}
                {...register("fullname", {
                  required: true,
                  minLength: 5,
                })}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div>
              <label className="label">Email Address : </label>
              <input
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
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div>
              <label className="label">User Name : </label>
              <input
                type="text"
                className={`form-control mt-2 ${
                  !!errors.username && "border-danger border-3"
                }`}
                {...register("username", {
                  required: true,
                  minLength: 5,
                })}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div>
              <label className="label">Gender :</label>
              <br />
              <div className="mt-3">
                <input
                  className="form-check-input"
                  type="radio"
                  id="Male"
                  value="Male"
                  name="Gender"
                  {...register("gender")}
                />
                &nbsp;
                <label className="form-check-label text-white" htmlFor="Male">
                  Male
                </label>
                &nbsp;&nbsp;&nbsp;
                <input
                  className="form-check-input"
                  type="radio"
                  id="Female"
                  value="Female"
                  name="Gender"
                  {...register("gender")}
                />
                &nbsp;
                <label className="form-check-label text-white" htmlFor="Female">
                  Female
                </label>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div>
              <label className="label">Date Of Birth </label>
              <input
                type="date"
                className={`form-control mt-2 ${
                  !!errors.dob && "border-danger border-3"
                }`}
                name="dob"
                {...register("dob", {
                  required: true,
                })}
              />
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div>
              <label className="label">Mobile No . : </label>
              <input
                type="text"
                className={`form-control mt-2 ${
                  !!errors.mobile && "border-danger border-3"
                }`}
                {...register("mobile", {
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                })}
              />
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
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
              <label className="label">Profile Photo : </label>
              <input
                type="file"
                className="form-control mt-1"
                {...register("photo")}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-3 text-center">
            <div>
              <button className="btn btn-lg btn-success" type="submit">
                Register
              </button>
              &nbsp; &nbsp; &nbsp;
              <button
                className="btn btn-lg btn-danger"
                type="button"
                onClick={() => {
                  navigtor("/login");
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
