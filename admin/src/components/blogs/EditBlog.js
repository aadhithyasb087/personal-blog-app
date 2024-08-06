import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../assets/icons/Loading/Loading";
import { useUser } from "../../contexts/UserContext";
import { BsPostcard } from "react-icons/bs";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddBlogForm from "../addblog/AddBlogForm";

function Edit() {
  const [loadingStart, setLoadingStart] = useState(true);
  const navigate = useNavigate();
  const { user } = useUser();
  const params = useParams();

  const id = params.id;
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (!id) {
      return;
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URI}/blogs/getblog/${id}`)
        .then((response) => setProductInfo(...response.data));
    }

    const fetchDataLoading = () => {
      setLoadingStart(false);
    };

    return () => fetchDataLoading();
  }, [user, id]);
  if (loadingStart) {
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
        <div>
          <h2>
            Edit <span>{productInfo?.title}</span>
          </h2>
          <h3>ADMIN PANEL</h3>
        </div>
        <div className="admin-content-breadcrumb">
          <BsPostcard />
          <span>/</span>
          <span>Edit</span>
        </div>
      </div>
      <div className="mt-3">
        {productInfo && <AddBlogForm {...productInfo
        } />}
      </div>
    </div>
  );
}

export default Edit;
