import React, { useState, useEffect } from "react";
import "./AddBlog.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../assets/icons/Loading/Loading";
import { useUser } from "../../contexts/UserContext";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import AddBlogForm from "../addblog/AddBlogForm";

function AddBlog() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [user]);
  if (loading) {
    return (
      <div className="loading">
        <Loading />
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="admin-content">
      <div className="admin-content-title">
        <div data-aos="fade-right">
          <h2>
            Add <span>Blog</span>
          </h2>
          <h3>ADMIN PANEL</h3>
        </div>
        <div className="admin-content-breadcrumb" data-aos="fade-left">
          <MdOutlineAddPhotoAlternate />
          <span>/</span>
          <span>Add Blog</span>
        </div>
      </div>
      <AddBlogForm  />
    </div>
  );
}

export default AddBlog;
