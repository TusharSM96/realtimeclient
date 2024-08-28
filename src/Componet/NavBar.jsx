import React, { useCallback, useContext, useEffect, useState } from "react";
import { PiChatCircleDotsFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../Middlewer/AuthWrapper";
import {
  GetUsersListApi,
  LogoutUserApi,
} from "../Servies/Apis";
import ProfileViewModal from "./ProfileViewModal";
import ProfileUpdateModal from "./ProfileUpdateModal";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

const NavBar = () => {
  const { UserDataHook, setUserDataHook, setSelectMessageConvertionId } =
    useContext(UserDataContext);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isUpdateProfileModalOpen, setUpdateProfileModalOpen] = useState(false);
  const [peopleSearchData, setPeopleSearchData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      LogoutUserApi({ userid: UserDataHook?.userData?._id }).then((resp) => {
      });
      setUserDataHook({ userData: null });
      setSelectMessageConvertionId(null);
      sessionStorage.clear();
      navigate("/login");
    }
  };
  const findUserList = useCallback(() => {
    if (!searchValue) {
      setPeopleSearchData([]);
      return;
    }
    GetUsersListApi({ searchvalue: searchValue }).then((resp) => {
      if (resp.code === 200) {
        setPeopleSearchData(resp.data);
      } else {
        setPeopleSearchData([]);
      }
    });
  }, [searchValue]);
  useEffect(() => {
    findUserList();
  }, [searchValue, findUserList]);
  useEffect(() => {
    if (UserDataHook.userData.profilePhoto) {
      setProfile(JSON.parse(UserDataHook.userData.profilePhoto));
    }
  }, [UserDataHook.userData.profilePhoto]);
  return (
    <>
      {isProfileModalOpen && (
        <ProfileViewModal
          open={isProfileModalOpen}
          close={() => setProfileModalOpen(false)}
        />
      )}
      {isUpdateProfileModalOpen && (
        <ProfileUpdateModal
          open={isUpdateProfileModalOpen}
          close={() => setUpdateProfileModalOpen(false)}
        />
      )}
      <Navbar
        sticky="top"
        expand="sm"
        className="bg-body-tertiary navbarmy"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container fluid>
          <Navbar.Brand>
            <h4>
              <PiChatCircleDotsFill color="#e1dbc0" /> &nbsp;Chat App
            </h4>
          </Navbar.Brand>
          <div className="dropdown-container" style={{ position: "relative" }}>
            <input
              type="search"
              placeholder="Search..."
              className="form-control"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {peopleSearchData.length > 0 && (
              <div className="UserListInMenu">
                {peopleSearchData.map((user, index) => (
                  <div
                    key={index}
                    className="UserListMenuCard"
                    onClick={() => {
                      setSelectMessageConvertionId(user?._id)
                      setSearchValue("");
                      setPeopleSearchData([]);
                    }}
                  >
                    <b className="usernamecircule">
                      {user.fullname?.toUpperCase().slice(0, 2)}
                    </b>
                    &nbsp; &nbsp;
                    <div>
                      <b>{user.fullname}</b><br/>
                      <b style={{color:user.socketId?"green":"red"}}>{user.socketId?"Online":"Offilne"}</b>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Navbar.Toggle aria-controls="offcanvasNavbar"/>
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Chat Web
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link
                  className="d-flex justify-content-center"
                  style={{ marginTop: "-5px" }}
                >
                  {profile?.type ? (
                    <img
                      alt="profile"
                      title="View Profile Details"
                      src={`data:${profile.type};base64,${profile.Base64}`}
                      width={40}
                      style={{ borderRadius: "50%", cursor: "pointer" }}
                      onClick={() => setUpdateProfileModalOpen(true)}
                    />
                  ) : (
                    <CgProfile
                      style={{ cursor: "pointer", color: "white" }}
                      size={40}
                      onClick={() => setUpdateProfileModalOpen(true)}
                    />
                  )}
                </Nav.Link>
                <Nav.Link onClick={() => setProfileModalOpen(true)}>
                  <button className="btn btn-danger">Profile</button>
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>
                  <button className="btn btn-danger">Logout</button>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
