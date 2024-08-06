import React, { useState } from "react";
import "./Header.css";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { GoScreenFull } from "react-icons/go";
import { GoScreenNormal } from "react-icons/go";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useUser } from "../../contexts/UserContext";
import ProfileImg from "../../assets/image/Aadhithya_Profile_Pic.png";
import Aside from "../Aside/Aside";
import { Link } from "react-router-dom";

function Header({ onSaveAside }) {
  const { user } = useUser();
  const [aside, setAside] = useState();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullScreen(false);
        });
      }
    }
  };
  return (
    <>
      <div className="header flex">
        <div className="logo flex">
          <h1>ADMIN</h1>
          <div
            className="bar-chart flex cursor"
            onClick={() => {
              setAside(!aside);
              onSaveAside(aside);
            }}
          >
            <RiBarChartHorizontalLine />
          </div>
        </div>
        <div className="header-right flex">
          <div className="cursor header-right-icon" onClick={toggleFullScreen}>
            {isFullScreen ? <GoScreenNormal /> : <GoScreenFull />}
          </div>
          <div className="cursor">
            <IoIosNotifications />
          </div>

          <div className="profile cursor">
            {user ? (
              <Link to="/settings">
                <img src={ProfileImg} alt="img" />
              </Link>
            ) : (
              <CgProfile className="profile-icon" size={50} />
            )}
            {/* <span className="profile-inner">AS</span> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
