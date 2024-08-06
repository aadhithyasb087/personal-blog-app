import React, { useState, useEffect } from "react";
import "./Aside.css";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BsPostcard } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePending } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
function Aside({ aside }) {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/");
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <aside className={`aside-left${aside ? " open" : ""}`}>
      <ul>
        <Link to="/">
          <li
            className={activeLink === "/" ? "navactive" : "nav-notactive"}
            onClick={() => {
              handleLinkClick("/");
            }}
          >
            <IoHome />
            <span>Dashboard</span>
          </li>
        </Link>
        <Link to="/blogs">
          <li
            className={activeLink === "/blogs" ? "navactive" : "nav-notactive"}
            onClick={() => {
              handleLinkClick("/blogs");
            }}
          >
            <BsPostcard />
            <span>Blogs</span>
          </li>
        </Link>{" "}
        <Link to="/addblog">
          <li
            className={
              activeLink === "/addblog" ? "navactive" : "nav-notactive"
            }
            onClick={() => {
              handleLinkClick("/addblog");
            }}
          >
            <MdOutlineAddPhotoAlternate />
            <span>Add Blog</span>
          </li>
        </Link>{" "}
        <Link to="/pending">
          <li
            className={
              activeLink === "/pending" ? "navactive" : "nav-notactive"
            }
            onClick={() => {
              handleLinkClick("/pending");
            }}
          >
            <MdOutlinePending />
            <span>Pending</span>
          </li>
        </Link>
        <Link to="/settings">
          <li
            className={
              activeLink === "/settings" ? "navactive" : "nav-notactive"
            }
            onClick={() => {
              handleLinkClick("/settings");
            }}
          >
            <IoSettingsOutline />
            <span>Settings</span>
          </li>
        </Link>
      </ul>
    </aside>
  );
}

export default Aside;
