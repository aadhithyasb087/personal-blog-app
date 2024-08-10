import React, { useState, useEffect } from "react";
import "./Settings.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../assets/icons/Loading/Loading";
import { useUser } from "../../contexts/UserContext";
import { MdAccountCircle } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { auth } from "../../firebase";
import profileImg from "../../assets/image/Aadhithya_Profile_Pic.png";
import guestImg from "../../assets/image/image.png";

function Settings() {
  const [loadingStart, setLoadingStart] = useState(true);

  const navigate = useNavigate();
  const { user } = useUser();
  console.log(user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setLoadingStart(false);
    }
  }, [user]);
  if (loadingStart) {
    return (
      <div className="loading">
        <Loading />
        <h1>Loading...</h1>
      </div>
    );
  }
  const signOut = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  return (
    <div className="admin-content">
      <div className="admin-content-title">
        <div data-aos="fade-right">
          <h2>
            Blogs <span>Settings</span>
          </h2>
          <h3>ADMIN PANEL</h3>
        </div>
        <div className="admin-content-breadcrumb" data-aos="fade-left">
          <IoSettingsOutline />
          <span>/</span>
          <span>Settings</span>
        </div>
      </div>
      <div className="profile-settings">
        <div className="leftprofile-details" data-aos="fade-up">
          <div className="leftprofile-image">
            {user.displayName === "Guest" ? (
              <img src={guestImg} alt="img" />
            ) : (
              <img src={profileImg} alt="img" />
            )}
          </div>
          <div className="right-profile">
            <div className="rightprofile-name">
              <h3>Username</h3>
              <p>
                {user.displayName} <br />
                {user.displayName !== "Guest" && "Admin"}
              </p>
            </div>

            <div className="rightprofile-name">
              <h3>Email</h3>
              <p>{user.email}</p>
            </div>
            {/* <div className="rightprofile-save">
              <button type="submit">Edit</button>
            </div> */}
          </div>
        </div>
        <div className="logoutsec" data-aos="fade-up">
          <div className="topaccoutbox">
            <h2>
              My Account
              <MdAccountCircle />
            </h2>
            <hr />
            <div className="logoutactive">
              <h3>
                Active Account <br />
                <span>Email</span>
              </h3>
              <button onClick={signOut}>Log out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
