import express from "express";
import Blog from "../models/blogModel.js";

const router = express.Router();

router.get("/id/:id", async (req, res, next) => {
  try {
    if (req.params?.id) {
      res.json(await Blog.find({ _id: req.params.id }));
    } else {
      res.status(400).json({ error: "ID parameter is required" });
    }
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    next(error);
  }
});

router.get("/category/:category", async (req, res, next) => {
  try {
    if (req.params?.category) {
      const catg = await Blog.find({ category: req.params.category });
      const currentBlogs = catg.filter((blog) => blog.status === "publish");
      res.json(currentBlogs.reverse());
    } else {
      res.status(400).json({ error: "Category parameter is required" });
    }
  } catch (error) {
    console.error("Error fetching blog by Category:", error);
    next(error);
  }
});

router.get("/tags/:tags", async (req, res, next) => {
  try {
    if (req.params?.tags) {
      const tags = await Blog.find({ tags: req.params.tags });
      const currentBlogs = tags.filter((blog) => blog.status === "publish");
      res.json(currentBlogs.reverse());
    } else {
      res.status(400).json({ error: "Tags parameter is required" });
    }
  } catch (error) {
    console.error("Error fetching blog by Tags:", error);
    next(error);
  }
});

router.get("/blog/:slug", async (req, res, next) => {
  try {
    if (req.params?.slug) {
      const slug = await Blog.find({ slug: req.params.slug });
      const currentBlogs = slug.filter((blog) => blog.status === "publish");
      res.json(currentBlogs);
    } else {
      res.status(400).json({ error: "Slug parameter is required" });
    }
  } catch (error) {
    console.error("Error fetching blog by Slug:", error);
    next(error);
  }
});

router.get("/allblogs", async (req, res, next) => {
  try {
    const allBlogs = await Blog.find({ status: "publish" }).sort({
      createdAt: -1,
    });
   
    res.status(200).json(allBlogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    next(error);
  }
});

export default router;
