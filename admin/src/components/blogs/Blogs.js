import React, { useState, useEffect } from "react";
import "./Blogs.css";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../assets/icons/Loading/Loading";
import { useUser } from "../../contexts/UserContext";
import { BsPostcard } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useFetchData from "../../hooks/useFetchData";
import LoadingTwo from "../../assets/icons/Loading/LoadingTwo";

function Blogs() {
  const { allData, loading } = useFetchData("/getblogs");
  const [loadingStart, setLoadingStart] = useState(true);

  const navigate = useNavigate();
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const filteredBlogs =
    searchQuery.trim() === ""
      ? allData
      : allData.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
  const indexOfLastblog = searchQuery.trim() === "" ? currentPage * perPage : 8;
  const indexOfFirstblog =
    searchQuery.trim() === "" ? (currentPage - 1) * perPage : 0;

  const currentBlogs =
    filteredBlogs.length > 0
      ? filteredBlogs.filter((blog) => blog.status === "publish")
      : [];

  const publishedBlogs =
    currentBlogs.length > 0
      ? currentBlogs.slice(indexOfFirstblog, indexOfLastblog)
      : [];
  const pageNumbers = [];
  const pageLength = currentBlogs?.length;
  for (let i = 1; i <= Math.ceil(pageLength / perPage); i++) {
    pageNumbers.push(i);
  }
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    const fetchDataLoading = () => {
      setLoadingStart(false);
    };

    return () => fetchDataLoading();
  }, [user]);
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
        <div data-aos="fade-right">
          <h2>
            All Published <span>Blogs</span>
          </h2>
          <h3>ADMIN PANEL</h3>
        </div>
        <div className="admin-content-breadcrumb" data-aos="fade-left">
          <BsPostcard />
          <span>/</span>
          <span>Blogs</span>
        </div>
      </div>
      <div className="blogs-table" data-aos="fade-up">
        <div className="flex blogs-search-box">
          <h2>Search Blogs:</h2>
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            placeholder="search by title..."
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Title</th>
              <th>Category</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                <tr>
                  <td>
                    <LoadingTwo />
                  </td>
                </tr>
              </>
            ) : (
              <>
                {publishedBlogs.length === 0 ? (
                  <tr>
                    <td className="text-center" colSpan={4}>
                      No Published Blog
                    </td>
                  </tr>
                ) : (
                  publishedBlogs.map((blog, index) => (
                    <tr key={blog._id}>
                      <td>{indexOfFirstblog + index + 1}</td>
                      <td className="table-title">
                        <h3>{blog.title}</h3>
                      </td>
                      <td>
                        <pre>{blog.category}</pre>
                      </td>
                      <td>
                        <div className="blogs-edit-delete flex">
                          <Link to={"/blogs/edit/" + blog._id}>
                            <button title="edit" className="blogs-edit">
                              <FaEdit />
                            </button>
                          </Link>
                          <Link to={"/blogs/delete/" + blog._id}>
                            <button title="delete" className="blogs-delete">
                              <RiDeleteBin6Fill />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </>
            )}
          </tbody>
        </table>
        {publishedBlogs.length === 0 ? (
          ""
        ) : (
          <div className="blogpagination">
            <button
              onClick={() => {
                paginate(currentPage - 1);
              }}
              disabled={searchQuery.trim() !== "" || currentPage === 1}
            >
              Previous
            </button>
            {pageNumbers
              .slice(
                Math.max(currentPage - 3, 0),
                Math.min(currentPage + 2, pageNumbers.length)
              )
              .map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    paginate(num);
                  }}
                  className={`${currentPage === num ? "active" : ""}`}
                  disabled={searchQuery.trim() !== ""}
                >
                  {num}
                </button>
              ))}
            <button
              onClick={() => {
                paginate(currentPage + 1);
              }}
              disabled={
                searchQuery.trim() !== "" || currentPage === pageNumbers.length
              }
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;
