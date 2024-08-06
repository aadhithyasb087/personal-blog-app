import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../assets/icons/Loading/Loading";
import { useUser } from "../../contexts/UserContext";
import { BsPostcard } from "react-icons/bs";
import { useParams } from "react-router-dom";
import axios from "axios";
import DeleteSvg from "../../assets/icons/DeleteSvg";

function Delete() {
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

  async function deleteOneBlog() {
    await axios.delete(
      `${process.env.REACT_APP_API_URI}/blogs/deleteblog/${id}`
    );
    goBack();
  }

  function goBack() {
    navigate("/blogs");
  }

  return (
    <div className="admin-content">
      <div className="admin-content-title">
        <div>
          <h2>
            Delete <span>{productInfo && productInfo.title}</span>
          </h2>
          <h3>ADMIN PANEL</h3>
        </div>
        <div className="admin-content-breadcrumb">
          <BsPostcard />
          <span>/</span>
          <span>Delete</span>
        </div>
      </div>
      <div className="deletesec">
        <div className="deletecard">
          <DeleteSvg />
          <p className="cookieHeading">Are you sure?</p>
          <p className="cookieDescription">
            If you delete this blog content it will be permanent delete
          </p>
          <div className="buttonContainer">
            <button className="acceptButton" onClick={deleteOneBlog}>
              Delete
            </button>
            <button className="declineButton" onClick={goBack}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delete;
