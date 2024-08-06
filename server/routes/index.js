import express from "express";
import blogRoute from "./blogRoute.js";
import clientBlogRoute from "./clientBlogRoute.js"
const router = express.Router();

router.use("/blogs", blogRoute);
router.use('/getblogs',clientBlogRoute)
export default router;
