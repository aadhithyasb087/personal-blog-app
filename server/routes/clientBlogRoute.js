import express from "express";
import Blog from "../models/blogModel.js";

const router = express.Router();

router.get("/id/:id", async (req, res) => {
  if (req.params?.id) {
    res.json(await Blog.find({ _id: req.params.id }));
  }
});

router.get("/category/:category", async (req, res) => {
  if (req.params?.category) {
    const catg = await Blog.find({ category: req.params.category });
    const currentBlogs = catg.filter((blog) => blog.status === "publish");
    res.json(currentBlogs.reverse());
  }
});

router.get("/tags/:tags", async (req, res) => {
  if (req.params?.tags) {
    const tags = await Blog.find({ tags: req.params.tags });
    const currentBlogs = tags.filter((blog) => blog.status === "publish");
    res.json(currentBlogs.reverse());
  }
});

router.get("/blog/:slug", async (req, res) =>
{
  if (req.params?.slug) {
    const slug = await Blog.find({ slug: req.params.slug });
    const currentBlogs = slug.filter((blog) => blog.status === "publish");
    res.json(currentBlogs);
  }
});

router.get("/allblogs", async (req, res) => {
  const allBlogs = await Blog.find();
  const currentBlogs = allBlogs.filter((blog) => blog.status === "publish");
  res.json(currentBlogs.reverse());
});

export default router;
