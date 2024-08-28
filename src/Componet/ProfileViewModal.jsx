import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { UserDataContext } from "../Middlewer/AuthWrapper";
import DefalyProfile from "../assets/profile1.jpg";

export default function ProfileViewModal({ open, close }) {
  const { UserDataHook } = useContext(UserDataContext);
  const [Profile, setProfile] = useState(null);
  useEffect(() => {
    let Data = UserDataHook.userData?.profilePhoto;
    setProfile(JSON.parse(Data));
  }, []);
  return (
    <Modal show={open} onHide={close} backdrop="static" keyboard={false}>
      <Modal.Header className="bg-black text-white">
        <Modal.Title>Profile Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-black text-white">
        <div className="d-flex justify-content-center">
          <img
            alt="profile"
            width={200}
            height={200}
            src={
              Profile?.Base64
                ? `data:${Profile?.type};base64,${Profile?.Base64}`
                : DefalyProfile
            }
            style={{ borderRadius: "5px" }}
          />
        </div>
        <h3>User Name : {UserDataHook.userData?.username}</h3>
        <h3>Mobile no. : {UserDataHook.userData?.mobileno}</h3>
        <h3>Email Address : {UserDataHook.userData?.email}</h3>
        <h3>Date of Birth : {UserDataHook.userData?.dob}</h3>
      </Modal.Body>
      <Modal.Footer className="bg-black text-white d-flex justify-content-center">
        <button className="btn btn-danger btn-lg" onClick={close}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
