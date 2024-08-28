import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { UserDataContext } from "../Middlewer/AuthWrapper";
import DefalyProfile from "../assets/profile1.jpg";
import { GetuserDetailsApi, UpdateUserDetailsApi } from "../Servies/Apis";
import GlobalNotify from "./GlobalNotify";
export default function ProfileUpdateModal({ open, close }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const { UserDataHook, setUserDataHook } = useContext(UserDataContext);
  const [Profile, setProfile] = useState(null);
  const SubmitHandler = (data) => {
    if (Profile?.filesize >= 200000) {
      return GlobalNotify(
        "File size exceeds the maximum allowed limit (2MB). Please choose a smaller file.",
        "e"
      );
    }
    const body = {
      email: UserDataHook.userData?.email,
      mobileno: data?.mobileno,
      username: data?.username,
      fullname: data?.fullname,
      profilePhoto: JSON.stringify(Profile),
    };
    UpdateUserDetailsApi(body).then((resp) => {
      if (resp?.code == 200) {
        GlobalNotify(resp?.Msg, "s");
        GetuserDetailsApi({
          email: UserDataHook.userData?.email,
          tokenglag: "Y",
        }).then((resptwo) => {
          if (resptwo?.code === 200) {
            sessionStorage.setItem("UserCrid", JSON.stringify(resptwo?.data));
            setUserDataHook({ userData: resptwo?.data });
            reset();
            close();
          }
        });
      } else {
        return GlobalNotify(resp?.Msg, "e");
      }
    });
  };

  const ProfileChageSubmit = async (e) => {
    let fileData = e.target?.files[0];
    new Promise((resolve, reject) => {
      let Render = new FileReader();
      Render.readAsDataURL(fileData);
      Render.onload = () => {
        const Base64 = Render.result.split(",")[1];
        let Data = {
          Base64: Base64,
          filename: fileData.name,
          filesize: fileData.size,
          type: fileData.type,
        };
        setProfile(Data);
        resolve(JSON.stringify(Data));
      };
      Render.onerror = (error) => {
        reject(error); // Reject the promise if there's an error
      };
    });
  };
  useEffect(() => {
    let Data = UserDataHook.userData?.profilePhoto;
    setValue("username", UserDataHook.userData?.username);
    setValue("fullname", UserDataHook.userData?.fullname);
    setValue("email", UserDataHook.userData?.email);
    setValue("mobileno", UserDataHook.userData?.mobileno);
    setProfile(JSON.parse(Data));
  }, []);
  return (
    <Modal
      show={open}
      onHide={close}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <form
        onPaste={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        autoComplete="off"
        autoSave="off"
        autoCorrect="off"
        onSubmit={handleSubmit(SubmitHandler)}
      >
        <Modal.Header className="bg-black text-white">
          <Modal.Title>Update Profile Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-black text-white">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex flex-column align-items-center">
              <label className="label text-danger">Profile Photo </label>
              <img
                alt="profile"
                width={250}
                height={250}
                src={
                  Profile?.Base64
                    ? `data:${Profile?.type};base64,${Profile?.Base64}`
                    : DefalyProfile
                }
                style={{ borderRadius: "30px" }}
              />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <div>
                <label className="label">User Name: </label>
                <input
                  type="text"
                  className={`form-control mt-2 ${
                    !!errors.username && "border-danger border-3"
                  }`}
                  {...register("username", {
                    required: true,
                  })}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <div>
                <label className="label">Full Name : </label>
                <input
                  type="text"
                  className={`form-control mt-2 ${
                    !!errors.fullname && "border-danger border-3"
                  }`}
                  {...register("fullname", {
                    required: true,
                  })}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <div>
                <label className="label">Email Address : </label>
                <input
                  type="email"
                  disabled
                  className={`form-control mt-2`}
                  {...register("email")}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <div>
                <label className="label">Mobile No. : </label>
                <input
                  type="text"
                  className={`form-control mt-2 ${
                    !!errors.mobileno && "border-danger border-3"
                  }`}
                  {...register("mobileno", {
                    required: true,
                    minLength: 10,
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
                  onChange={ProfileChageSubmit}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-black text-white d-flex justify-content-center">
          <button className="btn btn-danger btn-lg" type="submit">
            Update Profile
          </button>
          <button
            className="btn btn-danger btn-lg"
            onClick={close}
            type="button"
          >
            Close
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
