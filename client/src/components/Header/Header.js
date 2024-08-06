import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { IoMoonSharp } from "react-icons/io5";
import { HiBars3BottomRight } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";
import { LuSun } from "react-icons/lu";
import useFetchData from "../../hooks/useFetchData";

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [aside, setAside] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const ref = useRef(null);
  const focusRef = useRef(null);
  const closeRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClickOutside = (event) => {
    if (closeRef.current && !closeRef.current.contains(event.target)) {
      setSearchOpen(false);
    }
  };

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
      ref.current.checked = isDarkMode;
      setDarkMode(isDarkMode);
    }
  }, []);

  useEffect(() => {
    if (searchOpen) {
      focusRef.current.focus();
      setSearchQuery("");
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      if (darkMode) {
        document.body.classList.add("dark");
        localStorage.setItem("darkMode", true);
      } else {
        document.body.classList.remove("dark");
        localStorage.setItem("darkMode", false);
      }
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [darkMode, searchOpen]);

  const toggleDarkMode = () => {
    ref.current.checked = !darkMode;
    setDarkMode(!darkMode);
  };

  const openSearch = () => {
    setSearchOpen(true);
  };

  const asideOpen = () => {
    setAside(true);
  };

  const asideClose = () => {
    setAside(false);
  };

  const handleLinkClick = () => {
    setAside(false);
  };

  const { allData, loading } = useFetchData("/allblogs");
  const blogData = [...allData];
  const publishedBlogs = blogData.filter((blog) => blog.status === "publish");
  const filteredBlogs =
    searchQuery.trim() === ""
      ? []
      : publishedBlogs.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.trim())
        );

  return (
    <>
      <div className="header_sec">
        <div className="container header">
          <div className="logo">
            <Link to="/">
              <h1>
                <span>ASB</span> Blogs
              </h1>
            </Link>
          </div>
          <div className="searchbar">
            <IoSearchSharp />
            {/* <input
              type="text"
              onClick={openSearch}
              placeholder="Discover news, articles and more"
            /> */}
            <div onClick={openSearch}>Discover news, articles and more</div>
          </div>
          <div className="nav_list_dark">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: "https://portfolio-iota-livid-22.vercel.app/home",
                  }}
                  target="_blank"
                >
                  About
                </Link>
              </li>
              <li>
                <Link to="/">Admin Page</Link>
              </li>
            </ul>
            <div className="navlist_mobile_ul">
              <button onClick={toggleDarkMode}>
                {darkMode ? <IoMoonSharp /> : <LuSun />}
              </button>
              <button onClick={openSearch}>
                <IoSearch />
              </button>
              <button>
                <HiBars3BottomRight onClick={asideOpen} />
              </button>
            </div>
            <div className="darkmode">
              <label className="switch">
                <input type="checkbox" onChange={toggleDarkMode} ref={ref} />
                <span className="slider_header"></span>
              </label>
            </div>
          </div>
        </div>
        <div className={`search_click ${searchOpen ? "open" : ""}`}>
          <div ref={closeRef}>
            <div className="searchab_input">
              <IoSearchSharp />
              <input
                type="text"
                placeholder="Discover news, articles and more"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                ref={focusRef}
              />
            </div>
            <div className="search_data text-center">
              {loading ? (
                <div className="flex flex-center mt-2 pb-5">
                  <div className="loader"></div>
                </div>
              ) : (
                <>
                  {filteredBlogs.length > 0 ? (
                    <>
                      {filteredBlogs.slice(0, 4).map((blog) => {
                        return (
                          <div className="blog" key={blog._id}>
                            <div className="bloginfo">
                              <Link to={`/blog/${blog.slug}`}>
                                <h3>{blog.slug}</h3>
                                <p>
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Sint possimus itaque, ex
                                  quidem, reiciendis voluptatem eum consequuntur
                                  tenetur.
                                </p>
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div>No search results</div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="exit_search">
            <div>
              <FaXmark />
            </div>
            <h4>ESC</h4>
          </div>
        </div>
        <div className={`navlist_mobile ${aside ? "open" : ""} `}>
          <div className="navlist_m_title flex flex-sb">
            <h1>ASB Blogs</h1>
            <button>
              <FaXmark onClick={asideClose} />
            </button>
          </div>
          <hr />
          <h3 className="mt-3">Main menu</h3>
          <ul onClick={handleLinkClick}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="https://portfolio-iota-livid-22.vercel.app/home">
                About
              </Link>
            </li>
            <li>
              <Link to="/">Admin Page</Link>
            </li>
          </ul>
          <hr />
          <h3 className="mt-3">Topics</h3>
          <ul onClick={handleLinkClick}>
            <li>
              <Link to="/category/Web Development">Web Development</Link>
            </li>
            <li>
              <Link to="/category/Programming">Programming</Link>
            </li>
            <li>
              <Link to="/category/Technology">Technology</Link>
            </li>
            <li>
              <Link to="/category/Health">Health</Link>
            </li>

            <li>
              <Link to="/category/Finance">Finance</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
