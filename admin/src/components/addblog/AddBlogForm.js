import React, { useState } from "react";
import MarkdownEditor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AddBlogForm({
  _id,
  title: existingTitle,
  slug: existingSlug,
  category: existingCategory,
  tags: existingTags,
  status: existingStatus,
  description: existingDescription,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [slug, setSlug] = useState(existingSlug || "");

  const [category, setCategory] = useState(existingCategory || "");

  const [tags, setTags] = useState(existingTags || []);
  const [status, setStatus] = useState(existingStatus || "");
  const [description, setDescription] = useState(existingDescription || "");
  const navigate = useNavigate();

  const handleSlug = (e) => {
    const newslug = e.target.value.replace(/\s+/g, "-");
    setSlug(newslug);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const data = { title, slug, description, category, tags, status };
    if (_id) {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URI}/blogs/updateblog`,
        { ...data, _id }
      );
      console.log(res);
      if (res.data === true) {
        navigate("/");
      }
    } else {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/blogs/addblog`,
        data
      );

      if (res.status === 200) {
        navigate("/");
      }
    }
  };

  return (
    <form
      onSubmit={formSubmitHandler}
      className="addblog-form"
      data-aos="fade-up"
    >
      <div className="addblog-section">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="addblog-section">
        <label htmlFor="slug">Slug</label>
        <input
          type="text"
          id="slug"
          placeholder="Enter slug..."
          value={slug}
          onChange={handleSlug}
          required
        />
      </div>
      <div className="addblog-section">
        <label htmlFor="category">Category</label>
        <select
          className="addblog-category"
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option disabled selected value="">
            Select category
          </option>
          <option value="Web Development">Web Development</option>
          <option value="Programming">Programming</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Finance">Finance</option>
        </select>
        {/* <p className="addblog-existing">
          selected:
          {Array.isArray(category) ? (
            category.map((item) => <span>{item}</span>)
          ) : (
            <span> {category} </span>
          )}
        </p> */}
      </div>
      <div className="addblog-section addblog-blogcont">
        <label htmlFor="description">Blog Content</label>
        <MarkdownEditor
          value={description}
          onChange={(e) => {
            setDescription(e.text);
          }}
          style={{ width: "100%", height: "400px" }}
          renderHTML={(text) => (
            <ReactMarkdown
              components={{
                code: ({ node, inline, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  if (inline) {
                    return <code>{children}</code>;
                  } else if (match) {
                    return (
                      <div style={{ position: "relative" }}>
                        <pre
                          style={{
                            padding: "0",
                            borderRadius: "5px",
                            overflowX: "auto",
                            whiteSpace: "pre-wrap",
                          }}
                          {...props}
                        >
                          <code>{children}</code>
                        </pre>
                        <button
                          style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            zIndex: "1",
                          }}
                          onClick={() => {
                            navigator.clipboard.writeText(children);
                          }}
                        >
                          copy code
                        </button>
                      </div>
                    );
                  } else {
                    return <code {...props}>{children}</code>;
                  }
                },
              }}
            >
              {text}
            </ReactMarkdown>
          )}
        />
      </div>
      <div className="addblog-section">
        <label htmlFor="tags">Tags</label>
        <select
          name="tags"
          id="tags"
          value={tags}
          onChange={(e) =>
            setTags(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          multiple={true}
          required
        >
          <option value="Html">Html</option>
          <option value="CSS">CSS</option>
          <option value="Javascript">Javascript</option>
          <option value="React">React</option>
          <option value="Python">Python</option>
          <option value="AI">AI</option>
          <option value="ChatGPT">ChatGPT</option>
          <option value="Fitness">Fitness</option>
          <option value="Self Improvement">Self Improvement</option>
          <option value="Money">Money</option>
          <option value="Savings">Savings</option>
          <option value="Investment">Investment</option>
        </select>
        <p className="addblog-existing">
          selected:
          {Array.isArray(tags) ? (
            tags.map((item) => <span>{item}</span>)
          ) : (
            <span> {tags} </span>
          )}
        </p>
      </div>
      <div className="addblog-section addblog-status">
        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option disabled selected value="">
            Select Status
          </option>
          <option value="draft">Draft</option>
          <option value="publish">Publish</option>
        </select>
        {/* <p className="addblog-existing">
          selected: <span>status</span>
        </p> */}
      </div>
      <div className="addblog-save">
        <button type="submit">SAVE BLOG</button>
      </div>
    </form>
  );
}

export default AddBlogForm;
