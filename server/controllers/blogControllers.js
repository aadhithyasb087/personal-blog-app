import Blog from "../models/blogModel.js";

export const createBlog = async (req, res) => {
  const { title, slug, description, category, tags, status } = req.body;
  const blogDoc = await Blog.create({
    title,
    slug,
    description,
    category,
    tags,
    status,
  });
  res.json(blogDoc);
};

export const getBlog = async (req, res) => {
  if (req.params?.id) {
    res.json(await Blog.find({ _id: req.params.id }));
  }
};
export const getBlogs = async (req, res) => {
  res.json((await Blog.find()).reverse());
};

export const updateBlog = async (req, res) => {
  const { _id, title, slug, description, category, tags, status } = req.body;
  await Blog.updateOne(
    { _id },
    { title, slug, description, category, tags, status }
  );
  res.json(true);
};

export const deleteBlog = async (req, res) => {
  if (req.params?.id) {
    await Blog.deleteOne({ _id: req.params.id });
    res.json(true);
  }
};
