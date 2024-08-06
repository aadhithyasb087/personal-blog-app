import React, { useState, useEffect } from "react";
import useFetchData from "../hooks/useFetchData";
import { Link, useParams } from "react-router-dom";
import noimage from "../assets/images/imagenotavailable.png";
import profilePic from "../assets/images/Aadhithya_Profile_Pic.png";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
function BlogsPage() {
  const params = useParams();
  const slug = params.slug;
  const { allData, loading } = useFetchData(`/blog/${slug}`);
  const Code = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const [copy, setCopied] = useState(false);
    const handleCopy = () => {
      navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    };
    if (inline) {
      return <code>{children}</code>;
    } else if (match) {
      return (
        <div
          style={{
            position: "relative",
            margin: "20px 0px",
          }}
        >
          <SyntaxHighlighter
            style={a11yDark}
            language={match[0]}
            PreTag="pre"
            {...props}
            codeTagProps={{
              style: {
                padding: "0",
                borderRadius: "5px",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
              },
            }}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
          <button
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: "1",
              padding: "10px",
              backgroundColor: "#3d3d3d",
              color: "#fff",
            }}
            onClick={handleCopy}
          >
            {copy ? "Copied" : "Copy code"}
          </button>
        </div>
      );
    } else {
      return (
        <code className="md-post-code" {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <div className="slugpage">
      <div className="container container-center">
        <div className="topslug_titles">
          {loading ? (
            <div className="flex flex-center mt-2 pb-5 loading_sec">
              <div className="loader"></div>
            </div>
          ) : (
            <>
              <h1 className="slugtitle">{allData && allData[0].title}</h1>
              <h5>
                By <span>Aadhithya SB</span>. Published in{" "}
                <span>{allData && allData[0].category}</span> .{" "}
                {new Date(allData && allData[0].createdAt).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )}{" "}
                . <span>1 Min Read</span>
              </h5>
            </>
          )}
        </div>

        <div className="flex flex-start pb-5 flex-wrap">
          <div className="leftblo9g_data_markdown">
            {loading ? (
              <div className="flex flex-center mt-2 pb-5 loading_sec">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                <div className="w-100 blogcontent">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{ code: Code }}
                  >
                    {allData && allData[0].description}
                  </ReactMarkdown>
                </div>
              </>
            )}
          </div>
        </div>
        {/* <div className="category_blogs mt-3">
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
                      {blog.tags.map((tag) => (
                        <Link to={`/tags/${tag}`} key={tag}>
                          <div className="blogtag">{tag}</div>
                        </Link>
                      ))}

                      <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Recusandae facere consectetur repudiandae dolorum
                        vel quas provident iure voluptatibus. Quam nemo suscipit
                        eligendi veritatis incidunt praesentium ullam non sint
                        accusamus ut!
                      </p>
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
        </div> */}
      </div>
    </div>
  );
}

export default BlogsPage;
