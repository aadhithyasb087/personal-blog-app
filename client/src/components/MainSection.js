import React, { useState, useEffect } from "react";
import useFetchData from "../hooks/useFetchData";
import noimage from "../assets/images/imagenotavailable.png";
import { Link } from "react-router-dom";
import profilePic from "../assets/images/Aadhithya_Profile_Pic.png";
import { MdDeveloperMode } from "react-icons/md";
import { IoFitnessOutline } from "react-icons/io5";
import { MdLaptopChromebook } from "react-icons/md";
import { GoBook } from "react-icons/go";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { AiOutlinePython } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import HeaderSection from "./Header/HeaderSection";
import { extractParagraphs } from "../utils/extractParagraph";

function MainSection() {
  const { allData, loading } = useFetchData("/allblogs");
  const blogData = [...allData];

  const extractFirstImageUrl = (markdownContent) => {
    if (!markdownContent || typeof markdownContent !== "string") {
      return null;
    }

    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
  };

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
  return (
    <>
      <HeaderSection />
      <section className="main_blog_section">
        <div className="container flex flex-left flex-wrap flex-sb w-100">
          <div className="leftblog_sec">
            <h2>Recently Published</h2>
            <div className="blogs_sec">
              {loading ? (
                <div className="flex flex-center mt-2 pb-5 loading_sec">
                  <div className="loader"></div>
                </div>
              ) : (
                <>
                  {publishedBlogs.map((blog) => {
                    const firstImageUrl = extractFirstImageUrl(
                      blog.description
                    );
                    return (
                      <div className="blog" key={blog.slug}>
                        <div className="blogimg">
                          <Link to={`/blog/${blog.slug}`}>
                            <img
                              src={firstImageUrl || noimage}
                              alt={blog.title}
                            />
                          </Link>
                        </div>
                        <div className="bloginfo">
                          <Link to={`/blog/${blog.slug}`}>
                            <h3>{blog.title}</h3>
                          </Link>
                          <Link to={`/tags/${blog.tags[0]}`}>
                            <div className="bloginfo-tags">
                              {blog.tags.map((tag) => (
                                <Link to={`/tags/${tag}`} key={tag}>
                                  <div className="blogtag">{tag}</div>
                                </Link>
                              ))}
                            </div>
                          </Link>

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
            {loading ? (
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
          <div className="rightblog_info">
            <div className="topics_sec">
              <h2>Topics</h2>
              <div className="topics_list">
                <Link to="/category/Web Development">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <MdDeveloperMode />
                    </div>
                    <h3>Web Development</h3>
                  </div>
                </Link>
                <Link to="/category/Programming">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <AiOutlinePython />
                    </div>
                    <h3>Programming</h3>
                  </div>
                </Link>
                <Link to="/category/Technology">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <MdLaptopChromebook />
                    </div>
                    <h3>Technology</h3>
                  </div>
                </Link>{" "}
                <Link to="/category/Health">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <IoFitnessOutline />
                    </div>
                    <h3>Health</h3>
                  </div>
                </Link>{" "}
                <Link to="/category/Finance">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <RiMoneyRupeeCircleLine />
                    </div>
                    <h3>Finance</h3>
                  </div>
                </Link>
              </div>
            </div>
            <div className="tags_sec mt-3">
              <h2>Tags</h2>
              <div className="tags_list">
                <Link to="/tags/Html">#Html</Link>
                <Link to="/tags/CSS">#CSS</Link>
                <Link to="/tags/Javascript/">#Javascript</Link>
                <Link to="/tags/React">#React</Link>
                <Link to="/tags/AI">#AI</Link>
                <Link to="/tags/ChatGPT">#ChatGPT</Link>
                <Link to="/tags/Fitness">#Fitness</Link>
                <Link to="/tags/Self Improvement">#Self Improvement</Link>
                <Link to="/tags/Money">#Money</Link>
                <Link to="/tags/Savings">#Savings</Link>
                <Link to="/tags/Investment">#Investment</Link>
              </div>
            </div>
            <div className="letstalk_sec mt-3">
              <h2>Let's Talk</h2>
              <div className="talk_sec">
                <h4>
                  Want to find how i can solve problems specific to your
                  buisness? let's talk.
                </h4>
                <div className="social_talks flex flex-center gap-1 mt-2">
                  <div className="st_icon">
                    <Link to="https://github.com/aadhithyasb087">
                      <FaGithub />
                    </Link>
                  </div>
                  <div className="st_icon">
                    <Link to="https://www.linkedin.com/in/aadhithyasb1">
                      <CiLinkedin />
                    </Link>
                  </div>
                  <div className="st_icon">
                    <FaInstagram />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MainSection;
