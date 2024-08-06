import React, { useState, useEffect } from "react";
import useFetchData from "../hooks/useFetchData";
import { Link, useParams } from "react-router-dom";
import noimage from "../assets/images/imagenotavailable.png";
import profilePic from "../assets/images/Aadhithya_Profile_Pic.png";
import { extractParagraphs } from "../utils/extractParagraph";

function TagsPage() {
  const params = useParams();
  const tags = params.tags;
  const { allData, loading } = useFetchData(`/tags/${tags}`);
  const blogData = [...allData];
  console.log(blogData);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastblog = currentPage * perPage;
  const indexOfFirstblog = (currentPage - 1) * perPage;
  const pageNumbers = [];
  const publishedBlogs =
    blogData.length > 0
      ? blogData.slice(indexOfFirstblog, indexOfLastblog)
      : [];
  const pageLength = blogData?.length;
  for (let i = 1; i <= Math.ceil(pageLength / perPage); i++) {
    pageNumbers.push(i);
  }
  const extractFirstImageUrl = (markdownContent) => {
    if (!markdownContent || typeof markdownContent !== "string") {
      return null;
    }

    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="blogpage">
      <div className="category_slug">
        <div className="container">
          <div className="category_title">
            <div className="flex gap-1">
              <h1>
                {tags}{" "}
                <span>
                  {loading ? (
                    <div>0</div>
                  ) : (
                    publishedBlogs?.filter((blog) => blog.tags).length
                  )}
                </span>
              </h1>
            </div>
          </div>
          <div className="category_blogs mt-3">
            {loading ? (
              <div className="flex flex-center mt-2 pb-5 loading_sec">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                {publishedBlogs.map((blog) => {
                  const firstImageUrl = extractFirstImageUrl(blog.description);
                  return (
                    <div className="cate_blog" key={blog.slug}>
                      <Link to={`/blog/${blog.slug}`}>
                        <img src={firstImageUrl || noimage} alt={blog.title} />
                      </Link>
                      <div className="bloginfo cmt-2">
                        <Link to={`/blog/${blog.slug}`}>
                          <h3>{blog.title}</h3>
                        </Link>
                        <div className="bloginfo-tags">
                          {blog.tags.map((tag) => (
                            <Link to={`/tags/${tag}`} key={tag}>
                              <div className="blogtag">{tag}</div>
                            </Link>
                          ))}
                        </div>

                        <p>{extractParagraphs(blog.description)}...</p>
                        <div className="blogauthor flex gap-1">
                          <div className="blogaimg">
                            <img src={profilePic} alt="author-pic" />
                          </div>
                          <div className="flex flex-col flex-left gap-05">
                            <h4>Aadhithya SB</h4>
                            <span>
                              {new Date(blog.createdAt).toLocaleDateString(
                                "en-us",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          {publishedBlogs.length === 0 ? (
            ""
          ) : (
            <div className="blogpagination">
              <button
                onClick={() => {
                  paginate(currentPage - 1);
                }}
                disabled={currentPage === 1}
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
                  >
                    {num}
                  </button>
                ))}
              <button
                onClick={() => {
                  paginate(currentPage + 1);
                }}
                disabled={currentPage === pageNumbers.length}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TagsPage;
