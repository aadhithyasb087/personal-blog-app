import express from "express";
import {
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
} from "../controllers/blogControllers.js";
const router = express.Router();

router.post("/addblog", createBlog);

router.put("/updateblog", updateBlog);

router.delete("/deleteblog/:id", deleteBlog);

router.get("/getblogs", getBlogs);
router.get("/getblog/:id", getBlog);

export default router;
